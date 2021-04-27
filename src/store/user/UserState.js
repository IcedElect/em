import { 
    SET_POPUP, 
    SET_PRIVATE, 
    USER_FETCH_LOGIN,
    USER_FETCH_REGISTER, 
    USER_LOGIN_ERROR, 
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_FETCH_REGISTER_BY_EMAIL,
    USER_REGISTER_ERROR_BY_EMAIL,
    USER_REGISTER_SUCCESS_BY_EMAIL,
    SET_PROFILE, 
    SET_PAY_PENDING,
    SET_PAY_SUCCESS,
    SET_SUB_PENDING,
    SET_SUB_SUCCESS,
    SET_DIS_PENDING,
    SET_DIS_SUCCESS,
    SET_PRIVATE_ID,
    SET_JIVO_SHOW,
} from '../types';
import { Redirect } from "react-router";


import React, { useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import {getApi} from '../../utils/api';
import { getIsLoggedIn, getToken } from '../../utils';
import TagManager from "react-gtm-module";
import * as Sentry from "@sentry/react";

export const UserState = ({children}) => {

    const api = getApi();
    const token = localStorage.getItem('token');
    
    const initialState = {
        name: '',
        ready: false,
        phone: '',
        user: {
            id: '',
            external_id: '',
            first_name: '',
            last_name: '',
            
            avatar: null,
            username: '',
            email: '',
            token: getToken(),
            balance: 0,
            mode: 0,
            roles: []
        },
        jivoShow: false,
        pending: null,
        isAuthorized: false,
        errors: false,
        ios: false,
        loading: false,
        loader: 0,
        interval: null,
        deeplinks: {
            ip: ''
        },
        parameters: {},
        push_tokens: {},
        ref: '',
        email: '',
        password: '',
        private_id: {},
        popup: {},
        pay: {},
    }
    
    const [state, dispatch] = useReducer(userReducer, initialState)
    const initUser = async () => {

        if(!getIsLoggedIn()) {
            return false;
        }

        const nApi = getApi();

        nApi.get('/getData.php')
            .then(function (response) {
                Sentry.setUser(response?.data?.response?.profile);
                dispatch({type: SET_POPUP, popup: response?.data?.response?.popup});
                dispatch({type: SET_PROFILE, profile: response?.data?.response?.profile});
                dispatch({type: SET_PRIVATE, data: response?.data?.response?.private});
                dispatch({type: SET_PRIVATE_ID, private_id :response?.data?.response?.private});
                dispatch({type: USER_LOGIN_SUCCESS, token, user: response?.data?.response?.profile});
            })
            .catch(function (error) {
                let code = error?.response?.status;
                if (code && code >= 400 && code < 500)
                   window.location = '/register'
            })
            .then(function () {

            })
    }

    const fetchPay = async (tariff_id, redirect, cb) => {
        dispatch({type: SET_PAY_PENDING})

        let ua = window.navigator.userAgent.toLowerCase();
        let isSafari = (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ipod") != -1);

        var windowReference;
        if (isSafari)
            windowReference = window.open();
        else
            windowReference = window.open;

        let response = await api.post('/user/subscribe.php?tariff_id=' + tariff_id)
        .then(function(response) {
            const {status, data} = response

            if (!data.response.result && redirect) {
                if (isSafari) {
                    windowReference.location = data.response.url;
                }
                else {
                    let a = windowReference();
                    a.location = data.response.url;
                }
            }
            else {
                if (isSafari) {
                    windowReference.close();
                }
            }

            cb && cb(data)
        })
        dispatch({type: SET_PAY_SUCCESS, pay: response?.data?.response})
    }

    const fetchSub = async (tariff_id, redirect) => {
        dispatch({type: SET_PAY_PENDING})
        var windowReference = window.open();
        let response = await api.post('/user/prolong.php?tariff_id=' + tariff_id)
        .then(function(response) {
            const {status, data} = response
            
            if (!data.response.result && redirect) {
                windowReference.location = data.response.url
            }
        })
        dispatch({type: SET_SUB_SUCCESS, sub: response?.data?.response, result: response?.data?.response.result})
    }

    const fetchDisSub = async (id) => {
        dispatch({type: SET_DIS_PENDING})
        let response = await api.post('/user/disableSubscription.php?id=' + id)
        const {status, data} = response
        dispatch({type: SET_DIS_SUCCESS})
    }

    const fetchLogin = async ({email, password}) => {
        dispatch({type: USER_FETCH_LOGIN})
        var bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        let response = await api.post('/auth/login.php', bodyFormData)
            .then((response) => {
                localStorage.setItem('token', response?.data?.response?.token)
                document.location.href="/"
            })
            .catch((error) => {
                dispatch({type: USER_LOGIN_ERROR, error: 'Неверный пароль'})
            })
    }

    const fetchRegister = async (redirect) => {
            dispatch({type: USER_FETCH_REGISTER})

            let pkg = '';
            if (localStorage.getItem('pkg'))
                pkg = '&pkg=' + encodeURI(localStorage.getItem('pkg'));

            let aaid = '';
            if (localStorage.getItem('aaid'))
                aaid = '&aaid=' + encodeURI(localStorage.getItem('aaid'));
    
            let appmetrica_device_id = '';
            if (localStorage.getItem('appmetrica_device_id'))
                appmetrica_device_id = '&appmetrica_device_id=' + encodeURI(localStorage.getItem('appmetrica_device_id'));
    
            let appsflyer_id = '';
            if (localStorage.getItem('appsflyer_id'))
                appsflyer_id = '&appsflyer_id=' + encodeURI(localStorage.getItem('appsflyer_id'));
    
            let campaignName = '';
            if (localStorage.getItem('cn'))
                campaignName = '&cn=' + encodeURI(localStorage.getItem('cn'));
    
            let clickID = '';
            if (localStorage.getItem('cid'))
                clickID = '&cid=' + encodeURI(localStorage.getItem('cid'));

            let GProCID = '';
            if (localStorage.getItem('gpro_cid'))
                GProCID = '&gpro_cid=' + encodeURI(localStorage.getItem('gpro_cid'));

            let utm_adset = '';
            if (localStorage.getItem('utm_adset'))
                utm_adset = '&utm_adset=' + encodeURI(localStorage.getItem('utm_adset'));
    
            let response = api.post('/auth/signup.php?ref=' + localStorage.getItem('ref') + campaignName + GProCID + clickID + utm_adset + aaid + pkg + appsflyer_id + appmetrica_device_id)
            .then((response) => {
                localStorage.setItem('token', response?.data?.response?.token);
                dispatch({type: USER_REGISTER_SUCCESS, data: response?.data?.response});
                initUser();

                if(redirect) {
                    window.location.href = "/";
                }

                // return true
            })
    }

    const fetchEmailRegister = async ({email, password}) => {
        dispatch({type: USER_FETCH_REGISTER_BY_EMAIL})

        var bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);

        let pkg = '';
        if (localStorage.getItem('pkg'))
            pkg = '&pkg=' + encodeURI(localStorage.getItem('pkg'));

        let aaid = '';
        if (localStorage.getItem('aaid'))
            aaid = '&aaid=' + encodeURI(localStorage.getItem('aaid'));

        let appmetrica_device_id = '';
        if (localStorage.getItem('appmetrica_device_id'))
            appmetrica_device_id = '&appmetrica_device_id=' + encodeURI(localStorage.getItem('appmetrica_device_id'));

        let appsflyer_id = '';
        if (localStorage.getItem('appsflyer_id'))
            appsflyer_id = '&appsflyer_id=' + encodeURI(localStorage.getItem('appsflyer_id'));

        let campaignName = '';
        if (localStorage.getItem('cn'))
            campaignName = '&cn=' + encodeURI(localStorage.getItem('cn'));

        let GProCID = '';
        if (localStorage.getItem('gpro_cid'))
            GProCID = '&gpro_cid=' + encodeURI(localStorage.getItem('gpro_cid'));

        let clickID = '';
        if (localStorage.getItem('cid'))
            clickID = '&cid=' + encodeURI(localStorage.getItem('cid'));

        let utm_adset = '';
        if (localStorage.getItem('utm_adset'))
            utm_adset = '&utm_adset=' + encodeURI(localStorage.getItem('utm_adset'));

        let response = api.post('/auth/signupByEmail.php?ref='+ localStorage.getItem('ref') + campaignName + GProCID + clickID + utm_adset + aaid + pkg + appsflyer_id + appmetrica_device_id, bodyFormData)
        .then((response) => {
            localStorage.setItem('token', response?.data?.response?.token);
            dispatch({type: USER_REGISTER_SUCCESS_BY_EMAIL, data: response?.data?.response});
            window.location = '/'
            // initUser();
            return true
        })
    }

    const ShowJivo = () => {
        dispatch({type: SET_JIVO_SHOW, jivoShow: true})
    }

    const logout = () => {
        dispatch({type: USER_LOGOUT})
        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{
            ...state,
            fetchLogin, logout, fetchRegister, initUser, fetchPay, fetchSub, fetchDisSub, fetchEmailRegister, ShowJivo
        }}>
            {children}
        </UserContext.Provider>
    )
}