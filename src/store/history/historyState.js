

import React, { useReducer } from 'react';
import { HistoryContext } from './historyContext';
import { historyReducer } from './historyReducer';
import {getApi} from '../../utils/api';
import {getToken} from '../../utils';
import { STORIES, PASSWORD, INFO } from '../types';

export const HistoryState = ({children}) => {

    const api = getApi();
    const token = localStorage.getItem('token');

    const initialState = {
        balance: [],
        loading: false,
        error: false,
        showMore: false,
        password: '',
        telegram: '',
        country: '',
        card_number: '',
        invited_by: '',
    }
    
    const [state, dispatch] = useReducer(historyReducer, initialState)

    const fetchStories = async () => {
        dispatch({type: STORIES.REQUEST})
        const response = await api.get('/user/balance/getHistory.php')
        const { status, data } = response

        if(status == 200) {
            dispatch({type:STORIES.SUCCESS, balance: data?.response?.balance})
        }
    }

    const fetchInfo = async ({telegram, country, card_number, city, invited_by}) => {
        dispatch({type: INFO.REQUEST})
        var bodyFormData = new FormData();
        bodyFormData.append('telegram', telegram);
        bodyFormData.append('country', country);
        bodyFormData.append('card_number', card_number);
        bodyFormData.append('city', city);
        bodyFormData.append('invited_by', invited_by);
        const response = await api.post('/user/updateProfile.php', bodyFormData)
        const { status, data } = response

        if(status == 200) {
            dispatch({type: INFO.SUCCESS, data: response?.data?.response})
        }
    }

    const updatePassword = async ({password}) => {
        dispatch({type: PASSWORD.REQUEST})
        var bodyFormData = new FormData();
        bodyFormData.append('password', password)
        const response = await api.post('/user/updatePassword.php', bodyFormData)
        const { status, data } = response

        if(status == 200) {
            dispatch({type: PASSWORD.SUCCESS})
        }
    }

    return (
        <HistoryContext.Provider value={{
            ...state,
            fetchStories,
            updatePassword,
            fetchInfo
        }}>
            {children}
        </HistoryContext.Provider>
    )
}