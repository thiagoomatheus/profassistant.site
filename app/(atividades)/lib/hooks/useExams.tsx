import { Exam, ExamDB, ExamQuestionDB, ExamSimpleDB, UserDBSupabase } from "@/app/lib/types/types";

export default function useExams() {

    const cookies = document.cookie.split("; ")
    const access_token = cookies.find(cookie => cookie.startsWith("my-a"))?.split("=")[1]

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

    async function getExams(user: UserDBSupabase) {

        let exams: ExamSimpleDB[] = []

        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?select=id,title,school_name,subject&user_id=eq.${user.id}`, {
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
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

    async function getExam(id: string) {

        let exam: Exam = {
            title: "",
            teacher: "",
            school_name: "",
            subject: "",
            obs: "",
            grade: "",
            questions: []
        }

        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?select=id,title,teacher,school_name,subject,grade,obs&id=eq.${id}`, {
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            }
        }).then(result=> {
            return result.json()
        })
        .then(async (data: ExamDB[]) => {

            exam = {
                ...exam,
                id: id,
                title: data[0].title,
                teacher: data[0].teacher,
                school_name: data[0].school_name,
                subject: data[0].subject,
                obs: data[0].obs,
                grade: data[0].grade,
            }

        })
        .catch(error => {
            console.log(error);
        })
        
        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/question_combined?exam_id=eq.${id}`, {
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            }
            }).then(result=> {
                return result.json()
            })
            .then((data: ExamQuestionDB[]) => {
                data.map(question => {
                    exam.questions.push(question)
                })
            })
            .catch(error => {
                console.log(error);
            })

        return exam
    }

    async function addExam(exam: Exam) {

        const data = {
            title: exam.title,
            school_name: exam.school_name,
            subject: exam.subject,
            teacher: exam.teacher,
            grade: exam.grade,
            obs: exam.obs !== undefined ? exam.obs : null
        }

        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam`, {
            method:"POST",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(data)
        }).then(result => {
            return result.json()
        })
        .then(async response => {

            const exam_id: string = response[0].id

            const questions: ExamQuestionDB[] = exam.questions.map(question => {
                if (question.question_id) {
                question.question = null
                question.exam_id = exam_id
                return question
                }
                question.exam_id = exam_id
                return question
            })
            
            await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question`, {
                method:"POST",
                headers: {
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
                body: JSON.stringify(questions)
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
            return "error"
        })
        
        return "ok"
    }

    async function updateExam(previousExam: Exam, newExam: Exam) {

        const previousData: Partial<Exam> = {...previousExam}
        delete previousData.questions

        const newData: Partial<Exam> = {...newExam}
        delete newData.questions

        if (!isEquivalent(previousData, newData)) {
            await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam?id=eq.${newExam.id}`, {
                method:"PUT",
                headers: {
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
                body: JSON.stringify(newData)
            })
            .catch(error => {
                console.log(error);
                return "erro"
            })
        }

        if (previousExam.questions !== newExam.questions) {

            const oldQuestions: ExamQuestionDB[] = previousExam.questions

            const questionsWithId: ExamQuestionDB[] = newExam.questions.filter(question => question.id !== undefined)
            
            if (questionsWithId.length === 0) {
                await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question?exam_id=eq.${newExam.id}`, {
                    method:"DELETE",
                    headers: {
                        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}`,
                    }
                })
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
                    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question?id=eq.${id}`, {
                        method:"DELETE",
                        headers: {
                            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${access_token}`,
                        }
                    })
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
                
                await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/exam_question`, {
                    method:"POST",
                    headers: {
                        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(data)
                })
                .catch(error => {
                    console.log(error);
                    return "erro"
                })
            }
        }
        
        return "ok"
    }

    function printExam() {

        const printContent = document.querySelector("#print")!.innerHTML

        const win = window.open(undefined, undefined, "popup=true")!
        win.document.write("<html><head>")
        win.document.write("<title>Página de Impressão</title>")
        win.document.write('<link rel="stylesheet" href="/_next/static/css/app/layout.css?v=1707780007622" data-precedence="next_static/css/app/layout.css" />')
        win.document.write("</head><body>")
        win.document.write("<button class='block my-5 mx-auto p-2 border bg-blue-2 text-white rounded-xl print:hidden' onclick='window.print()'>Imprimir</button>")
        win.document.write(printContent)
        win.document.write("</body></html>")
        
    }

    return {
        getExams,
        getExam,
        addExam,
        updateExam,
        printExam
    }
}