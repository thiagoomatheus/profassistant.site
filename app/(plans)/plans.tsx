export const plans = [
    {
        id: 1,
        name: "Free",
        value: "free",
        functionalities: [
            {
                feature:"Crie seu próprio banco de questões, textos, provas e atividades",
                active: true
            },
            {
                feature:"Salve 10 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 5 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature:"Gere textos, questões ou expressões matemáticas com IA",
                active: false
            },
            {
                feature:"Corriga e verifique questões com IA (em desenvolvimento)",
                active: false
            }
        ],
        price: "0,00"
    },
    {
        id: 2,
        name: "Pro",
        value: "pro",
        functionalities: [
            {
                feature:"Crie seu próprio banco de questões, textos, provas e atividades",
                active: true
            },
            {
                feature:"Salve 200 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 50 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature:"Gere textos, questões ou expressões matemáticas com IA",
                active: true
            },
            {
                feature: "Limite de 100 gerações por mês",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA (em desenvolvimento)",
                active: false
            }
        ],
        price: "29,99"
    },
    {
        id: 3,
        name: "Premium",
        value: "premium",
        functionalities: [
            {
                feature:"Crie seu próprio banco de questões, textos, provas e atividades",
                active: true
            },
            {
                feature:"Salve 500 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 100 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature:"Gere textos, questões ou expressões matemáticas com IA",
                active: true
            },
            {
                feature: "Limite de 250 gerações por mês",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA (em desenvolvimento)",
                active: true
            }
        ],
        price: "49,99"
    }
]