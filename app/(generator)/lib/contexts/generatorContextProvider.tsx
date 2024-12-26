"use client"

import { createContext, useContext, useReducer } from "react";

type InitialStatesType = {
    data: string[] | null,
    subject: string | null,
    type: "text" | "question" | "math_expression" | "phrase" | null,
    loading: boolean
}

type ActionReducerType = {
    type: "setType" | "generateLoading" | "generateSuccess" | "generateFailed",
    subject?: string,
    typeGenerated?: "text" | "question" | "math_expression" | "phrase" | null
    data?: string[]
}

const GeneratorContext = createContext<
  { state: InitialStatesType; dispatch: React.Dispatch<ActionReducerType> }
>( { state: { data: null, subject: null, type: null, loading: false }, dispatch: () => {}} );


export function GeneratorContextProvider( {children}: { children: React.ReactNode} ) {

    const [state, dispatch] = useReducer(generatorReducer, initialStates)

    return (
        <GeneratorContext.Provider value={{ state, dispatch }}>
            {children}
        </GeneratorContext.Provider>
    );

}

export const useGeneratorContext = () => {
    return useContext(GeneratorContext);
};

const generatorReducer = (state: InitialStatesType, action: ActionReducerType): InitialStatesType => {
    switch (action.type) {
        case "setType":
            return {
                ...state,
                type: action.typeGenerated || state.type,
                data: null
            }
        case "generateLoading":
            return {
                ...state,
                loading: true,
                data: null,
                subject: action.subject || state.subject,
            };
        case "generateSuccess":
            return {
                ...state,
                data: action.data || state.data,
                loading: false,
            };
        case "generateFailed": 
            return {
                ...state,
                data: null,
                loading: false
            }
        default:
            return state;
    }
};

const initialStates: InitialStatesType = {
    data: null,
    subject: null,
    type: null,
    loading: false
}

