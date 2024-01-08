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

export type UserDB = {
    name: string,
    email: string,
    plan: "free" | "basic" | "premium" | "pro",
    id: string
}

