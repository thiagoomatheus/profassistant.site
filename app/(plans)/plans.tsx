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
                feature:"Salve 20 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 10 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature:"Gere textos, questões ou expressões matemáticas com IA",
                active: false
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: false
            }
        ],
        price: "0,00",
        limits: {
            generateds: 20,
            exams: 10,
            ia: 0
        }
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
                feature: "Limite de 100 usos de IA por mês",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: false
            }
        ],
        price: "29,99",
        limits: {
            generateds: 200,
            exams: 50,
            ia: 100
        }
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
                feature:"Corriga e verifique questões com IA",
                active: true
            }
        ],
        price: "49,99",
        limits: {
            generateds: 500,
            exams: 100,
            ia: 250
        }
    }
]