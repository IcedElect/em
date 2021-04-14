import { MODAL_TOGGLE, MODAL_SHOW, MODAL_HIDE, MODAL_SET } from "../types";

const handlers = {
    [MODAL_SET]: (state, {id}) => ({...state, show: [id]}),
    [MODAL_SHOW]: (state, {id}) => ({
        ...state,
        show: [...state.show, id]
    }),
    [MODAL_HIDE]: (state, {id}) => ({
        ...state,
        show: state.show.filter((item) => item !== id )
    }),
    [MODAL_TOGGLE]: (state, {id}) => ({
        ...state,
        show: state.show.indexOf(id) > -1
              ? state.show.filter((item) => item !== id )
              : [...state.show, id]
    }),
    DEFAULT: state => state
}

export const modalReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action)
}