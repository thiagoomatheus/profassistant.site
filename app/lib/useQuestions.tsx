export default function useQuestions() {

    const question = {
        body: "",
        alternativeA: "",
        alternativeB: "",
        alternativeC: "",
        alternativeD: ""
    }

    function separateQuestion(q: string): {
        body: string;
        alternativeA: string;
        alternativeB: string;
        alternativeC: string;
        alternativeD: string;
    } {
        question.body = q.split("a)")[0]
        const alternativesABCD = q.split("a)")[1]
        question.alternativeA = alternativesABCD?.split("b)")[0]
        const alternativesBCD = alternativesABCD.split("b)")[1]
        question.alternativeB = alternativesBCD.split("c)")[0]
        const alternativesCD = alternativesBCD.split("c)")[1]
        question.alternativeC = alternativesCD.split("d)")[0]
        question.alternativeD = alternativesCD.split("d)")[1]
        return question
    }

    return {
        separateQuestion,
    }

}