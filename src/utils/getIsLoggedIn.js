import { getToken } from ".";

export const getIsLoggedIn = () => !!getToken()