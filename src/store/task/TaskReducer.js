import { TASK, TASKS, SET_CATS, HIDE_MORE } from "../types";

const handlers = {
    [SET_CATS]: (state, {cats}) => ({...state, cats}),
    [TASK.REQUEST]: (state, {id}) => ({...state, single: {id}, loading: true, showMore: true}),
    [TASK.SUCCESS]: (state, {single}) => ({...state, single, loading: false}),
    [TASKS.REQUEST]: (state, {id}) => ({...state, loading: true}),
    [TASKS.SUCCESS]: (state, {list, cat}) => ({...state, list,cat, loading: false}),
    [HIDE_MORE]: (state) => ({...state, showMore: false}),
    // [TASKS.REQUEST]: (state, {id}) => ({...state, list: [], loading: true}),
    DEFAULT: state => state
}

export const taskReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}