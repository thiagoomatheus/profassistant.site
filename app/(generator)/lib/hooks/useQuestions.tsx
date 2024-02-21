"use client"

import { ResponseAPIContext } from "../contexts/ResponseAPIContext";
import { Question, QuestionDB, UserDBSupabase } from "../../../lib/types/types";
import { useContext, useEffect, useRef } from "react";

export default function useQuestions() {

    const { response, subject } = useContext(ResponseAPIContext)

    let access_token: React.MutableRefObject<string> = useRef("")

    useEffect(() => {
        const cookies = document.cookie.split("; ")
        access_token.current = cookies.find(cookie => cookie.startsWith("my-a"))?.split("=")[1]!
    },[])

    
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
            console.log(response);
            
            const tratedResponse: string = response.replace(/\\n/g, "  ").replace(/[\\"']/g, "").replace(/\s{2,}/g, ' ').replace(/[\s]+\)/, ")")
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

    async function saveQuestion(user: UserDBSupabase, question: string, handleStatus: React.Dispatch<React.SetStateAction<boolean>>) {

        const data = {
            question: question,
            subject: subject!,
            user_id: user.id
        }

        if (user.plan === "basic") {
            const questionsLocal = localStorage.getItem("savedQuestions")
            if (!questionsLocal) {
                localStorage.setItem("savedQuestions", JSON.stringify([data]))
                handleStatus(true)
                return
            }
            else {
                let questions = JSON.parse(questionsLocal)
                questions.push(data)
                localStorage.setItem("savedQuestions", JSON.stringify(questions))
                handleStatus(true)
                return
            }
        }
        
        fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/questions?columns=question,subject,user_id`, {
            method: "POST",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token.current}`,
            },
            body: JSON.stringify(data)
        }).then((data: any) => {
            console.log(data);
        })
    }

    async function getQuestions(user: UserDBSupabase) {

        if (user.plan === "basic") {
            const questionsLocal: QuestionDB[] = JSON.parse(localStorage.getItem("savedQuestions") || "")
            return questionsLocal
        }
        else if (user.plan === "premium" || user.plan === "pro") {
            let questionsAccount: QuestionDB[] = []
            
            await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/questions?select=id,question,subject&user_id=eq.${user.id}`, {
                headers: {
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token.current}`,
                },
                next: { revalidate: 1 }
            }).then(result=> {
                return result.json()
            })
            .then(data => {
                if (data.length) {
                    data?.map((question: QuestionDB) => {
                        questionsAccount.push(question)
                    })
                }
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

            const data = {
                question: question
            }

            fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/questions?id=eq.${id}`, {
            method: "PATCH",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token.current}`,
            },
            body: JSON.stringify(data)
        }).then((data: any) => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        })

            return 200
        }
    }

    async function deleteQuestion(id:string) {

        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/questions?id=eq.${id}`, {
            method:"DELETE",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token.current}`,
            }
        })
        .catch(error => {
            console.log(error);
            return "erro"
        })
        
        return "ok"
    }

    return {
        separateQuestion,
        transformResponseInObject,
        treatResponseForText,
        saveQuestion,
        getQuestions,
        updateQuestion,
        deleteQuestion
    }

}