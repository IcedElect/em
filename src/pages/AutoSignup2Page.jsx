import {useContext, useEffect} from "react";
import {UserContext} from "../store/user/UserContext";
import Loading from "../components/Loading";
import { ModalContext } from "../store/modal/ModalContext";
import Modal from "../UI/Modal";
import Greeting from "../modal/Greeting";
import VerifyModal from "../modal/VerifyModal";
import PrelendModal from "../modal/Prelend";

const AutoSignup2Page = () => {
    const { fetchRegister, email, fetchPay } = useContext(UserContext);
    const { setModal, hideModal, show } = useContext(ModalContext);

    useEffect(() => {
        // const ref = findGetParameter('ref')
        // if(ref)
        //     localStorage.setItem('ref', ref)
        //
        // const campaignName = findGetParameter('cn')
        // if(campaignName)
        //     localStorage.setItem('cn', campaignName)
        //
        // const clickID = findGetParameter('cid')
        // if(clickID)
        //     localStorage.setItem('cid', clickID)

        fetchRegister()
    }, [])

    useEffect(() => {
        if(email) {
            setModal('greeting');
        }
    }, [email])

    const onPay = () => {
        fetchPay('3t', true, (data) => {
            console.log('result', data.response.result);
            if(data.response.result) {
                setModal('prelend')
            }
        })
    }

    return (
        <div className="background pic1">
            <div className="background__top"></div>
            <div className="background__bottom">
                Загрузка...
            </div>
            <Greeting onClose={() => setModal('verify')} />
            <VerifyModal onClose={() => onPay()} />
            <PrelendModal />
        </div>
    )
}

export default AutoSignup2Page