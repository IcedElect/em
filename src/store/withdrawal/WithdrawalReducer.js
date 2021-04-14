import { WITHDRAWAL } from "../types";

const handlers = {
    [WITHDRAWAL.REQUEST]: state => ({...state, loading: true}),
    [WITHDRAWAL.SUCCESS]: (state, {card, sum}) => ({...state, loading: false, card, sum, success: true}),
    [WITHDRAWAL.FAILURE]: (state, {error}) => ({...state, loading: false, error}),
    DEFAULT: state => state
}

export const withdrawalReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}