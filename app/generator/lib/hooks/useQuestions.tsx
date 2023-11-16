import { Message } from "ai";
import { MessageContext } from "../../../lib/contexts/MessageContext";
import { Question } from "../../../lib/types/types";
import useHandleForm from "./useHandleForm";
import { useContext } from "react";

export default function useQuestions() {

    const { info } = useHandleForm()
    const { messages } = useContext(MessageContext)

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

    function treatResponseAPI () {
        let questionsReceiveds: Question[] = []
        const response: Message = messages!
        const tratedResponse: string = response.content.replaceAll("\\n", " ").replace(/[\\"]/g, "")
        const questions: string[] = tratedResponse.split("--")
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

    return {
        separateQuestion,
        treatResponseAPI,
        questions
    }

}