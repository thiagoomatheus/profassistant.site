import { ResponseAPIContext } from "../contexts/ResponseAPIContext";
import { Question } from "../../../lib/types/types";
import useHandleForm from "./useGenerator";
import { useContext } from "react";

export default function useQuestions() {

    const { info } = useHandleForm()
    const { response } = useContext(ResponseAPIContext)

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
                subject: info.materia,
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
        const tratedResponse: string = response!.content.replace(/\\n/g, "  ").replace(/[\\"']/g, "").replace(/\s{2,}/g, ' ').replace(/[\s]+\)/, ")")
        const questionsSeparated: string[] = tratedResponse.split("--")
        const questions: string[] = questionsSeparated.filter(item => item.trim().length > 0)
        return questions
    }

    function transformResponseInObject () {
        let questionsReceiveds: Question[] = []
        const questions = treatResponseForText()
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

    async function saveQuestion(userPlan: "basic" | "premium" | "pro", question: string) {
        switch (userPlan) {
            case "basic":
                const questionsLocal = localStorage.getItem("savedQuestions")
                if (!questionsLocal) {
                    localStorage.setItem("savedQuestions", JSON.stringify([question]))
                    return
                }
                else {
                    let questions: string[] = JSON.parse(questionsLocal)
                    questions.push(question)
                    localStorage.setItem("savedQuestions", JSON.stringify(questions))
                }
                break;
            case "premium" || "pro":
                console.log(info.materia);
                break
        }
    }

    return {
        separateQuestion,
        transformResponseInObject,
        treatResponseForText,
        saveQuestion,
        questions
    }

}