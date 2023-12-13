import { ResponseAPIContext } from "../contexts/ResponseAPIContext";
import { Question, UserDB } from "../../../lib/types/types";
import { useContext } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/app/lib/firebase/firebase";
import { json } from "stream/consumers";

export default function useQuestions() {

    const { response, subject } = useContext(ResponseAPIContext)

    let questions: Question[]  = []

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
            questions.push(question)
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

    function saveQuestion(user: UserDB, question: string, handleStatus: React.Dispatch<React.SetStateAction<"read" | "edit" | "saved">>) {
        if (user.plan === "basic") {
            const questionsLocal = localStorage.getItem("savedQuestions")
            if (!questionsLocal) {
                localStorage.setItem("savedQuestions", JSON.stringify([question]))
                return
            }
            else {
                let questions: string[] = JSON.parse(questionsLocal)
                questions.push(question)
                localStorage.setItem("savedQuestions", JSON.stringify(questions))
                return
            }
        }
        const id = Date.now().toString()
        const data = {
            question: question,
            subject: subject,
            id: id
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
                handleStatus("saved")
            }
        })
    }

    return {
        separateQuestion,
        transformResponseInObject,
        treatResponseForText,
        saveQuestion,
        questions
    }

}