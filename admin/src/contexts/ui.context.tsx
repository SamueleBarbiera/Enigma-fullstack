import React, { ReactNode, useContext, useMemo, useReducer } from 'react'

export interface State {
    displaySidebar: boolean
    displayModal: boolean
    modalData: any
    modalView: string
}

const initialState = {
    displaySidebar: false,
    displayModal: false,
    modalView: 'LOGIN_VIEW',
    modalData: null,
}

type Action =
    | {
          type: 'OPEN_SIDEBAR'
      }
    | {
          type: 'CLOSE_SIDEBAR'
      }
    | {
          type: 'OPEN_MODAL'
      }
    | {
          type: 'CLOSE_MODAL'
      }
    | {
          type: 'SET_MODAL_VIEW'
          view: MODAL_VIEWS
      }
    | {
          type: 'SET_MODAL_DATA'
          data: MODAL_DATA
      }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW' | 'DELETE_PRODUCT' | 'BAN_CUSTOMER'
type MODAL_DATA = any

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
    switch (action.type) {
        case 'OPEN_SIDEBAR': {
            return {
                ...state,
                displaySidebar: true,
            }
        }
        case 'CLOSE_SIDEBAR': {
            return {
                ...state,
                displaySidebar: false,
            }
        }
        case 'OPEN_MODAL': {
            return {
                ...state,
                displayModal: true,
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                displayModal: false,
            }
        }
        case 'SET_MODAL_VIEW': {
            return {
                ...state,
                modalView: action.view,
            }
        }
        case 'SET_MODAL_DATA': {
            return {
                ...state,
                modalData: action.data,
            }
        }
    }
}

export const UIProvider = (props: { children?: ReactNode }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState)

    const value = useMemo(
        () => ({
            toggleSidebar: () =>
                state.displaySidebar ? dispatch({ type: 'CLOSE_SIDEBAR' }) : dispatch({ type: 'OPEN_SIDEBAR' }),
            closeSidebarIfPresent: () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
            ...state,
            openSidebar: () => dispatch({ type: 'OPEN_SIDEBAR' }),
            closeSidebar: () => dispatch({ type: 'CLOSE_SIDEBAR' }),
            openModal: () => dispatch({ type: 'OPEN_MODAL' }),
            closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
            setModalView: (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
            setModalData: (data: MODAL_DATA) => dispatch({ type: 'SET_MODAL_DATA', data }),
        }),
        [state]
    )

    return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`)
    }
    return context
}
