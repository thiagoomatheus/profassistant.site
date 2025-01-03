export type Question = {
    subject: string
    body: string
    alternativeA: string
    alternativeB: string
    alternativeC: string
    alternativeD: string
    correctAlternative: string
}
export type GeneratedDB = {
    id?: string
    type: "text" | "question" | "phrase" | "math_expression"
    data: string
    subject: string
}
export type QuestionDB = {
    question: string
    id: string
    subject: string
}
export type TextDB = {
    text: string
    id: string
    subject: string
}
export type PhraseDB = {
    phrase: string
    id: string
    subject: string
}
export type MathExpressionDB = {
    question: string
    id: string
}
export type User = {
    name: string
    cpf: string
    phone: string
    email: string
    password: string
    plan: string
}
export type UserSession = {
    access_token: string
    refresh_token: string
    user: {
      id: string
      aud: string
      role: string
      email: string
      email_confirmed_at: string
      phone: string
      confirmed_at: string
      last_sign_in_at: string
      app_metadata: {provider: string, providers: string[]}
      user_metadata: {}
      identities: string[]
      created_at: string
      updated_at: string
    }
    token_type: 'bearer'
    expires_in: number
    expires_at: number
}
export type UserDBSimple = {
    name: string
    plan: "free" | "premium" | "pro"
    id: string
}
export type UserDBComplete = {
    name: string
    plan: "free" | "premium" | "pro"
    id: string
    created_at: string
    school_name: string
    theme: string
    user_email: string
    phone: string
    id_customer_asaas?: string
    subscription_id?: string
    payment_link?: string
}
export type Exam = {
    id?: string
    title: string
    teacher: string
    school_name: string
    subject: string
    obs?:string
    grade: string
    questions: ExamQuestionDB[]
}
export type ExamDB = {
    id: number | string
    title: string
    teacher: string
    school_name: string
    subject: string
    obs?:string
    grade: string
}
export type ExamSimpleDB = {
    id: string
    title: string
    subject: string
    school_name: string
}
export type ExamQuestionDB = {
    id?: string
    support: string | null
    support_id: string | null
    question: string | null
    question_id: string | null
    exam_id: string | null
    position: number | undefined
    layout: "simple" | "support" | "math_expressions" | undefined
}
