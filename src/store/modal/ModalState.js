import { useReducer } from "react"
import { MODAL_HIDE, MODAL_SET, MODAL_SHOW, MODAL_TOGGLE } from "../types"
import { ModalContext } from "./ModalContext"
import { modalReducer } from "./ModalReducer"

export const ModalState = ({children}) => {

    const initialState = {
        show: []
    }

    const [state, dispatch] = useReducer(modalReducer, initialState)

    const setModal = (id) => dispatch({type: MODAL_SET, id})
    const showModal = (id) => dispatch({type: MODAL_SHOW, id})
    const hideModal = (id) => dispatch({type: MODAL_HIDE, id})
    const toggleModal = (id) => dispatch({type: MODAL_TOGGLE, id})

    return (
        <ModalContext.Provider value={{
            ...state,
            setModal, showModal, hideModal, toggleModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}