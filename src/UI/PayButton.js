import React, {useContext} from 'react';
import { UserContext } from '../store/user/UserContext';
import {configs} from "../utils/config";

export default function PayButton({className, text, cart}) {

    const { user } = useContext(UserContext);
    const { connectToSocket, disconnectSocket } = useContext(contextValue);

    const pay = ({onClick}) => {
        this.config = JSON.parse(configs.getToken());
        if(onClick) {
            onClick();
        }
    
        if(!user.cp_token) {
            let payUrl = 'https://dgbet.ru/pay/?' + encodeURI(window.btoa(JSON.stringify({
                amount: data.amount,
                currency: data.currency,
                event_name: data.event_name,
                user_id: user.id,
            })));
            window.open(this.config.away + '?' + new URLSearchParams({
                source: source,
                uid: user.id,
                url: payUrl
            }),'_blank');
        } else {
            chargeByToken({
                Amount: data.amount,
                EventName: data.event_name,
            })
        }
    }

    return (
        <>
            <div
                className={className}
                onClick={() => {

                    pay();

                }}>
                {cart}
                {text}
            </div>
        </>
    )
}