import { useReducer } from "react";
import { getApi } from "../../utils/api";
import { WITHDRAWAL } from "../types"
import { WithdrawalContext } from "./WithdrawalContext";
import { withdrawalReducer } from './WithdrawalReducer';


export const WithdrawalState = ({children}) => {
    
    const api = getApi();

    const initialState = {
        card: '',
        sum: '',
        success: false,
        loading: false,
    }
    const [state, dispatch] = useReducer(withdrawalReducer, initialState)

    const fetchWithdrawal = async ({card, sum}) => {
        dispatch({type: WITHDRAWAL.REQUEST})
        var bodyFormData = new FormData();
        bodyFormData.append('card', card);
        bodyFormData.append('sum', sum);
        dispatch({type:WITHDRAWAL.SUCCESS})
        let response = await api.post('/user/balance/withdraw.php', bodyFormData)

    }


    return (
        <WithdrawalContext.Provider value={{
            ...state,
            fetchWithdrawal
        }}>
            {children}
        </WithdrawalContext.Provider>
    )
}