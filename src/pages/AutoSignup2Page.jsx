import {useContext, useEffect} from "react";
import {UserContext} from "../store/user/UserContext";
import Loading from "../components/Loading";
import { ModalContext } from "../store/modal/ModalContext";
import Modal from "../UI/Modal";
import Greeting from "../modal/Greeting";
import VerifyModal from "../modal/VerifyModal";
import PrelendModal from "../modal/Prelend";
import InstagramBrowser from "../modal/InstagramBrowser";

const AutoSignup2Page = () => {
    const { fetchRegister, email, fetchPay } = useContext(UserContext);
    const { setModal, hideModal, show } = useContext(ModalContext);

    useEffect(() => {
        if (window.navigator.userAgent.toLowerCase().includes("instagram"))
            setModal('instagram_browser');
        else
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
                 window.location = '/';
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
            <InstagramBrowser />
        </div>
    )
}

export default AutoSignup2Page