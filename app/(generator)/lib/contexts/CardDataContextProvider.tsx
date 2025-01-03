"use client"

import { createContext, useContext, useReducer } from "react"

type InitialStateType = {
    isSave: boolean
    isEdit: boolean
    data: string | null
}

type ActionReducerType = {
    type: string
    data?: string | null
}

const initialState: InitialStateType = {
    isSave: false,
    isEdit: false,
    data: null
}

function cardDataReducer(state: InitialStateType, action: ActionReducerType): InitialStateType {
    switch (action.type) {
        case "setCancel":
            return {
                ...state,
                isEdit: false,
                data: action.data || state.data
            }
        case "setEdit":
            return {
                ...state,
                isEdit: true
            }
        case "setSave":
            return {
                ...state,
                isSave: true,
                isEdit: false,
                data: action.data || state.data
            }
        case "setData":
            return {
                ...state,
                data: action.data || state.data
            }
        default:
            return state
    }
}

const CardDataContext = createContext<{
    state: InitialStateType,
    dispatch: React.Dispatch<ActionReducerType>
}>({
    state: initialState,
    dispatch: () => {}
})

export default function CardDataContextProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(cardDataReducer, initialState)

    return (
        <CardDataContext.Provider value={{ state, dispatch }}>
            {children}
        </CardDataContext.Provider>
    )
}

export const useCardDataContext = () => {
    return useContext(CardDataContext)
};

