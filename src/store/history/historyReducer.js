import {STORIES, PASSWORD, INFO} from '../types';

const handlers = {
    [STORIES.REQUEST]: (state) => ({...state, loading: true}),
    [STORIES.SUCCESS]: (state, {balance}) => ({...state, balance, loading: false}),
    [INFO.REQUEST]: (state, {data}) => ({...state, data, loading: true}),
    [INFO.SUCCESS]: (state, {data}) => ({...state, data, loading: false}),
    [PASSWORD.REQUEST]: state => ({...state, loading: true}),
    [PASSWORD.SUCCESS]: state => ({...state, loading: false}),
    DEFAULT: state => state
}

export const historyReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}