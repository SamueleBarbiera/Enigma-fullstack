/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'

export type MODAL_VIEWS =
    | 'DELETE_PRODUCT'
    | 'DELETE_TYPE'
    | 'DELETE_ATTRIBUTE'
    | 'DELETE_CATEGORY'
    | 'DELETE_ORDER'
    | 'DELETE_COUPON'
    | 'DELETE_TAX'
    | 'DELETE_SHIPPING'
    | 'DELETE_ORDER_STATUS'
    | 'DELETE_TAG'
    | 'BAN_CUSTOMER'
    | 'SHOP_APPROVE_VIEW'
    | 'SHOP_DISAPPROVE_VIEW'
    | 'DELETE_STAFF'
    | 'ADD_WALLET_POINTS'
    | 'EXPORT_IMPORT_PRODUCT'
    | 'EXPORT_IMPORT_ATTRIBUTE'

type State = {
    type: string
    id: number
    view?: MODAL_VIEWS
    data: any
    isOpen: boolean
}

type Action = { type: 'open'; view?: MODAL_VIEWS; payload?: any } | { type: 'close' }

const initialState: State = {
    id: 0,
    type: '',
    view: undefined,
    isOpen: false,
    data: null,
}

function modalReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                view: action.view,
                data: action.payload,
                isOpen: true,
            }
        case 'close':
            return {
                ...state,
                view: undefined,
                data: null,
                isOpen: false,
            }
        default:
            throw new Error('any Modal Action!')
    }
}

const ModalStateContext = createContext<State>(initialState)
ModalStateContext.displayName = 'ModalStateContext'
const ModalActionContext = createContext<Dispatch<Action> | undefined>(undefined)
ModalActionContext.displayName = 'ModalActionContext'

interface Prop {
    children: ReactNode
}

export const ModalProvider = ({ children }: Prop) => {
    const [state, dispatch] = useReducer(modalReducer, initialState)
    return (
        <ModalStateContext.Provider value={state}>
            <ModalActionContext.Provider value={dispatch}>{children}</ModalActionContext.Provider>
        </ModalStateContext.Provider>
    )
}

export function useModalState() {
    const context = useContext<State>(ModalStateContext)
    return context
}

export function useModalAction() {
    const dispatch = useContext(ModalActionContext)
    if (dispatch === undefined) {
        throw new Error(`useModalAction must be used within a ModalProvider`)
    }
    return {
        openModal(view?: MODAL_VIEWS, payload?: any) {
            dispatch({ type: 'open', view, payload })
        },
        closeModal() {
            dispatch({ type: 'close' })
        },
    }
}
