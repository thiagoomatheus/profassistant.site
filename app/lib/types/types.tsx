export type Question = {
    subject: string,
    body: string;
    alternativeA: string;
    alternativeB: string;
    alternativeC: string;
    alternativeD: string;
    correctAlternative: string;
}

export type User = {
    email: string,
    password: string
}