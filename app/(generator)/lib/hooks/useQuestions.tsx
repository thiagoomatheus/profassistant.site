import { ResponseAPIContext } from "../contexts/ResponseAPIContext";
import { Question, QuestionDB, UserDB, UserDBSupabase } from "../../../lib/types/types";
import { useContext } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase";

export default function useQuestions() {

    const { response, subject } = useContext(ResponseAPIContext)

    function separateQuestion(q: string): Question | undefined {
        if (q) {
            const fullQuestion = q.split("Resposta:")[0]
            const correctAlternative = q.split("Resposta:")[1]
            const body = fullQuestion.split("a)")[0]
            const alternativesABCD = fullQuestion.split("a)")[1]
            const alternativeA = alternativesABCD?.split("b)")[0]
            const alternativesBCD = alternativesABCD?.split("b)")[1]
            const alternativeB = alternativesBCD?.split("c)")[0]
            const alternativesCD = alternativesBCD?.split("c)")[1]
            const alternativeC = alternativesCD?.split("d)")[0]
            const alternativeD = alternativesCD?.split("d)")[1]
            const question = {
                subject: subject!,
                body: body,
                alternativeA: alternativeA,
                alternativeB: alternativeB,
                alternativeC: alternativeC,
                alternativeD: alternativeD,
                correctAlternative: correctAlternative
            }
            return question
        }
    }

    function treatResponseForText() {
        if (response) {
            const tratedResponse: string = response?.content.replace(/\\n/g, "  ").replace(/[\\"']/g, "").replace(/\s{2,}/g, ' ').replace(/[\s]+\)/, ")")
            const questionsSeparated: string[] = tratedResponse.split("--")
            const questions: string[] = questionsSeparated.filter(item => item.trim().length > 0)
            return questions
        }
    }

    function transformResponseInObject (questions: string[]) {
        let questionsReceiveds: Question[] = []
        questions.map(q => {
            if (!q) {
                return
            }
            const question = separateQuestion(q)
            if (question) {
                questionsReceiveds.push(question)
            }
        })
        return questionsReceiveds
    }

    function saveQuestion(user: UserDBSupabase, question: string, handleStatus: React.Dispatch<React.SetStateAction<boolean>>) {

        const id = Date.now().toString()
        const data = {
            question: question,
            subject: subject!,
            id: id
        }

        if (user.plan === "basic") {
            const questionsLocal = localStorage.getItem("savedQuestions")
            if (!questionsLocal) {
                localStorage.setItem("savedQuestions", JSON.stringify([data]))
                handleStatus(true)
                return
            }
            else {
                let questions: QuestionDB[] = JSON.parse(questionsLocal)
                questions.push(data)
                localStorage.setItem("savedQuestions", JSON.stringify(questions))
                handleStatus(true)
                return
            }
        }

        const ref = `users/${user.id}/questions/${id}`
        fetch("/api/saveQuestion", {
            method: "POST",
            body: JSON.stringify({
                ref: ref,
                data: data
            })
        })
        .then(response => {
            if (response.status === 200) {
                handleStatus(true)
            }
        })
    }

    async function getQuestions(user: UserDBSupabase) {

        if (user.plan === "basic") {
            const questionsLocal: QuestionDB[] = JSON.parse(localStorage.getItem("savedQuestions") || "")
            return questionsLocal
        }
        else if (user.plan === "premium" || user.plan === "pro") {
            let questionsAccount: QuestionDB[] = []
                await getDocs(collection(db, "users", user.id, "questions"))
                .then(r => {
                    r.forEach(doc => {
                        if (!doc.exists()) {
                            console.log("não existe");
                            return
                        }
                        questionsAccount.push(doc.data())
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
                return questionsAccount
        }
    }

    async function updateQuestion(user: UserDBSupabase, question: string, id: string) {
        if (user.plan === "basic") {
            getQuestions(user).then(questionsLocal => {
                questionsLocal!.map(q => {
                    if (q.id === id) {
                        q.question = question
                        return
                    }
                    return
                })
                localStorage.setItem("savedQuestions", JSON.stringify(questionsLocal))
            })
            return 200           
        }
        else if (user.plan === "premium" || user.plan === "pro") {
            try {
                await updateDoc(doc(db, "users", user.id, "questions", id), {
                    question: question
                })
            } catch (error) {
                return 401
            }
            return 200
        }
    }

    return {
        separateQuestion,
        transformResponseInObject,
        treatResponseForText,
        saveQuestion,
        getQuestions,
        updateQuestion
    }

}