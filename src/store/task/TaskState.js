    import { TASKS, TASK, SET_CATS, HIDE_MORE } from '../types';

import React, { useReducer } from 'react';
import { TaskContext } from './TaskContext';
import { taskReducer } from './TaskReducer';
import {getApi} from '../../utils/api';
import { getToken } from '../../utils';

export const TaskState = ({children}) => {

    const api = getApi();
    const token = localStorage.getItem('token');
    
    const initialState = {
        list: [],
        cats: [],
        single: false,
        error: false,
        loading: false,
        showMore: true,
        cat: 0,
    }

    const [state, dispatch] = useReducer(taskReducer, initialState)

    const fetchCats = async () => {
        let response = await api.get('/getData.php');
        dispatch({type: SET_CATS, cats: response?.data?.response?.cats})
    }

    const fetchTasks = async (cat_id, page) => {

        dispatch({type: TASKS.REQUEST})
        const offset = (page - 1) * 20;
        const response = await api.get('/offers/getOffers.php', {params:{cat_id, offset}})
        const { status, data } = response

        if(status == 200) {
            if(data?.response?.offers?.length < 20) {
                dispatch({type: HIDE_MORE})
            }

            const list = cat_id == state.cat ? [...state.list, ...data?.response?.offers] : data?.response?.offers;
            // const list = data?.response?.offers
            dispatch({type: TASKS.SUCCESS, cat: cat_id, list })
        } else {
            dispatch({type: TASKS.FAILURE, error: 'AAAAAAAA'})
        }
    }

    const fetchTask = async (id) => {

        dispatch({type: TASK.REQUEST})
        const response = await api.get('/offers/getOffer.php?id=' + id)
        const { status, data } = response

        if(status == 200) {
            dispatch({type: TASK.SUCCESS, single: data?.response?.offer})
        } else {
            dispatch({type: TASK.FAILURE, error: 'AAAAAAAA'})
        }
    }

    return (
        <TaskContext.Provider value={{
            ...state,
            fetchCats, fetchTask, fetchTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}