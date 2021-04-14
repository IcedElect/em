import axios from 'axios';
import { getToken } from './getToken';
import { API_URL } from "../config";

export const getApi = () => {
    let token = getToken();

    let api = axios.create({
        baseURL: API_URL,
        responseType: "json",
        headers: {
            common: {
                Authorization: token
            }
        }
    });

    return api;
}