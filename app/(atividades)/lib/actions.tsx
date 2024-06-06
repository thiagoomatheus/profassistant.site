"use server"

import { createClient } from "@/app/lib/supabase/server";
import { Exam, ExamDB, ExamQuestionDB, ExamSimpleDB } from "@/app/lib/types/types";
import { revalidateTag } from "next/cache";

export async function getExams() {
    const supabase = createClient()
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    const id = (await supabase.auth.getUser()).data.user?.id

    let exams: ExamSimpleDB[] = []

    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?select=id,title,school_name,subject&user_id=eq.${id}`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        next: { 
            revalidate: 1, 
            tags: ["get_exams"] 
        }
    }).then(result=> {
        return result.json()
    })
    .then(data => {
        if (data.length) {
            data?.map((exam: ExamSimpleDB) => {
                exams.push(exam)
            })
        }
    })

    return exams
}

export async function getExam(exam_id: string) {
    const supabase = createClient()
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    let exam: Exam = {
        title: "",
        teacher: "",
        school_name: "",
        subject: "",
        obs: "",
        grade: "",
        questions: []
    }
    const resultExam = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?select=id,title,teacher,school_name,subject,grade,obs&id=eq.${exam_id}`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    if (resultExam.status !== 200) {
        return
    }
    const responseExam: ExamDB[] = await resultExam.json()
    exam = {
        ...exam,
        id: exam_id,
        title: responseExam[0].title,
        teacher: responseExam[0].teacher,
        school_name: responseExam[0].school_name,
        subject: responseExam[0].subject,
        obs: responseExam[0].obs,
        grade: responseExam[0].grade,
    }
    const resultQuestions = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/questions_combined?exam_id=eq.${exam_id}`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, 
        }
    })
    if (resultQuestions.status !== 200) {
        return
    }
    const responseQuestions: ExamQuestionDB[] = await resultQuestions.json()
    responseQuestions.map(question => {
        exam.questions.push(question)
    })
    return exam
}

export async function addExam(exam: Exam) {
    const supabase = createClient()
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    const resultExam = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam`, {
        method:"POST",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "Prefer": "return=representation"
        },
        body: JSON.stringify({
            title: exam.title,
            school_name: exam.school_name,
            subject: exam.subject,
            teacher: exam.teacher,
            grade: exam.grade,
            obs: exam.obs !== undefined ? exam.obs : null
        })
    })
    const responseExam = await resultExam.json()
    if (resultExam.status !== 201) {
        return resultExam.status
    }
    const exam_id: string = responseExam[0].id
    const questions: ExamQuestionDB[] = exam.questions.map(question => {
        if (question.question_id) {
        question.question = null
        question.exam_id = exam_id
        return question
        }
        question.exam_id = exam_id
        return question
    })
    const resultExamQuestion = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question`, {
        method:"POST",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(questions)
    })
    return resultExamQuestion.status
}

export async function updateExam(previousExam: Exam, newExam: Exam) {
    function isEquivalent(a: any, b: any) {
        var aProps = Object.keys(a);
        var bProps = Object.keys(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }
    const supabase = createClient()
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    const previousData: Partial<Exam> = {...previousExam}
    delete previousData.questions
    const newData: Partial<Exam> = {...newExam}
    delete newData.questions
    if (!isEquivalent(previousData, newData)) {
        const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?id=eq.${newExam.id}`, {
            method:"PUT",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newData)
        })
        if (result.status !== 204) {
            return result.status
        }
    }
    if (previousExam.questions !== newExam.questions) {
        const oldQuestions: ExamQuestionDB[] = previousExam.questions
        const questionsWithId: ExamQuestionDB[] = newExam.questions.filter(question => question.id !== undefined)
        if (questionsWithId.length === 0 && oldQuestions.length > 0) {
            const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question?exam_id=eq.${newExam.id}`, {
                method:"DELETE",
                headers: {
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            if (result.status !== 204) {
                return result.status
            }
        }
        else if (questionsWithId.length > 0 && oldQuestions.length > questionsWithId.length) {
            const oldQuestionsIds: string[] = []
            const questionsWithIdIds: string[] = []
            oldQuestions.map(question => {
                return oldQuestionsIds.push(question.id!)
            })
            questionsWithId.map(question => {
                return questionsWithIdIds.push(question.id!)
            })
            let questions = new Set(oldQuestionsIds)
            for (let e of questionsWithIdIds) {
                questions.delete(e)
            }
            const questionsExcludeds = Array.from(questions)
            questionsExcludeds.map(async id => {
                const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question?id=eq.${id}`, {
                    method:"DELETE",
                    headers: {
                        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    }
                })
                if (result.status !== 204) {
                    return result.status
                }
            })
        }
        const newQuestions: ExamQuestionDB[] = newExam.questions.filter(question => question.id === undefined)
        if (newQuestions.length > 0) {
            const data: ExamQuestionDB[] = newQuestions.map(question => {
                if (question.question_id) {
                    question.question = null
                    question.exam_id = newExam.id!
                    return question
                }
                question.exam_id = newExam.id!
                return question
            })      
            const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question`, {
                method:"POST",
                headers: {
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data)
            })
            if (result.status !== 201) {
                return result.status
            }
        }
    }
    return 201
}

export async function deleteExam(id:string) {
    const supabase = createClient()
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token
    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?id=eq.${id}`, {
        method:"DELETE",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    .catch(error => {
        console.log(error);
        return "erro"
    })
    return revalidateTag("get_exams")
}