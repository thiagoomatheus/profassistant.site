export const plans = [
    {
        id: 1,
        name: "Grátis",
        value: "gratis",
        functionalities: [
            {
                feature:"Salve 100 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 25 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature: "Limite de 50 usos de IA por mês",
                active: true
            },
            {
                feature: "Salve suas atividades em PDF",
                active: true
            },
            {
                feature: "Salve suas atividades em DOC (Word)",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: false
            }
        ],
        price: "0,00",
        limits: {
            generateds: 100,
            exams: 25,
            ia: 50
        }
    },
    {
        id: 2,
        name: "Básico",
        value: "basico",
        functionalities: [
            {
                feature:"Salve 300 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 75 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature: "Limite de 150 usos de IA por mês",
                active: true
            },
            {
                feature: "Salve suas atividades em PDF",
                active: true
            },
            {
                feature: "Salve suas atividades em DOC (Word)",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: true
            }
        ],
        price: "9,99",
        limits: {
            generateds: 300,
            exams: 75,
            ia: 150
        }
    },
    {
        id: 3,
        name: "Pro",
        value: "pro",
        functionalities: [
            {
                feature:"Salve 1000 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 250 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature: "Limite de 500 usos de IA por mês",
                active: true
            },
            {
                feature: "Salve suas atividades em PDF",
                active: true
            },
            {
                feature: "Salve suas atividades em DOC (Word)",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: true
            }
        ],
        price: "24,99",
        limits: {
            generateds: 1000,
            exams: 250,
            ia: 500
        }
    },
    {
        id: 4,
        name: "Premium",
        value: "premium",
        functionalities: [
            {
                feature:"Salve 2500 questões ou textos no banco de dados",
                active: true
            },
            {
                feature:"Salve 500 provas ou atividades no banco de dados",
                active: true
            },
            {
                feature: "Limite de 1000 gerações por mês",
                active: true
            },
            {
                feature: "Salve suas atividades em PDF",
                active: true
            },
            {
                feature: "Salve suas atividades em DOC (Word)",
                active: true
            },
            {
                feature:"Corriga e verifique questões com IA",
                active: true
            }
        ],
        price: "39,99",
        limits: {
            generateds: 2500,
            exams: 500,
            ia: 1000
        }
    }
]