export type Question = {
    subject: string,
    body: string,
    alternativeA: string,
    alternativeB: string,
    alternativeC: string,
    alternativeD: string,
    correctAlternative: string
}

export type QuestionDB = {
    question: string,
    id: string,
    subject: string
}

export type User = {
    name: string,
    email: string,
    password: string,
    plan: "free" | "basic" | "premium" | "pro" 
}

export type UserDBSupabase = {
    name: string,
    plan: "free" | "basic" | "premium" | "pro",
    id: string
}

export type Exam = {
    id?: string,
    title: string,
    teacher: string,
    school_name: string,
    subject: string,
    obs?:string,
    grade: string,
    questions: ExamQuestionDB[]
}

export type ExamDB = {
    id: number | string,
    title: string,
    teacher: string,
    school_name: string,
    subject: string,
    obs?:string,
    grade: string,
}

export type ExamSimpleDB = {
    id: string,
    title: string,
    subject: string,
    school_name: string
}

export type ExamQuestionDB = {
    id?: string,
    title_text: string | null,
    text: string | null,
    image: string | null,
    question: string | null,
    question_id: string | null,
    exam_id: string | null,
    position: number | undefined,
    alternative: "yes" | "no" | undefined,
    layout: "simple" | "text" | "image" | undefined
}
