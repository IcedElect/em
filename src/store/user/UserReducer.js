import { 
    USER_FETCH_LOGIN, 
    USER_LOGIN_ERROR, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_UPDATE, 
    USER_READY, 
    USER_FETCH_REGISTER, 
    USER_REGISTER_ERROR, 
    USER_REGISTER_SUCCESS,
    USER_FETCH_REGISTER_BY_EMAIL,
    USER_REGISTER_ERROR_BY_EMAIL,
    USER_REGISTER_SUCCESS_BY_EMAIL,
    SET_PRIVATE, SET_POPUP, 
    SET_PROFILE, 
    SET_PAY_PENDING, 
    SET_PAY_SUCCESS, 
    SET_PRIVATE_ID, 
    SET_SUB_PENDING,
    SET_SUB_SUCCESS,
    SET_DIS_PENDING,
    SET_DIS_SUCCESS,
    SET_JIVO_SHOW,
} from "../types";

const handlers = {
    [SET_POPUP]: (state, {popup}) => ({...state, popup}),
    [SET_PROFILE]: (state, {profile}) => ({...state, profile}),
    [SET_JIVO_SHOW]: (state, {jivoShow}) => ({...state, jivoShow}),
    [SET_PRIVATE]: (state, {data}) => ({...state, private: data}),
    [SET_PRIVATE_ID]: (state, {private_id}) => ({...state, private_id}),
    [USER_FETCH_REGISTER]: state => ({...state, loading: true, ios: true}),
    [USER_REGISTER_ERROR]: (state, {error}) => ({...state, error, loading: false}),
    [USER_REGISTER_SUCCESS]: (state, {data}) => ({...state, email: data.email, password: data.password, loading: false, ref: data.ref}),
    [USER_FETCH_REGISTER_BY_EMAIL]: state => ({...state, loading: true, ios: true}),
    [USER_REGISTER_ERROR_BY_EMAIL]: (state, {error}) => ({...state, error, loading: false}),
    [USER_REGISTER_SUCCESS_BY_EMAIL]: (state, {data}) => ({...state, email: data.email, password: data.password, loading: false, ref: data.ref}),

    [SET_PAY_PENDING]: state => ({...state, loading: true}),
    [SET_PAY_SUCCESS]: (state, pay) => ({...state, pay, loading: false}),
    [SET_SUB_PENDING]: state => ({...state, loading: true}),
    [SET_SUB_SUCCESS]: (state, sub) => ({...state, sub, loading: false}),
    [SET_DIS_PENDING]: state => ({...state, loading: true}),
    [SET_DIS_SUCCESS]: (state, dis) => ({...state, dis, loading: false}),

    [USER_FETCH_LOGIN]: state => ({...state, loading: true}),
    [USER_LOGIN_ERROR]: (state, {error}) => ({...state, error, loading: false}),
    [USER_LOGIN_SUCCESS]: (state, {token, user}) => ({
        ...state, 
        user,
        token, 
        loading: false, 
        error: '',
        isAuthorized: true,
        ready: true,
    }),
    [USER_READY]: (state) => ({...state, ready: true}),
    [USER_UPDATE]: (state, {info}) => ({...state, info: {...state.info, info}}),
    [USER_LOGOUT]: state => ({...state, info: {}, token: false, isAuthorized: false}),
    DEFAULT: state => state
}

export const userReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}