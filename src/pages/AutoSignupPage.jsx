import {useContext, useEffect} from "react";
import {UserContext} from "../store/user/UserContext";
import Loading from "../components/Loading";
import { ModalContext } from "../store/modal/ModalContext";
import Modal from "../UI/Modal";
import Greeting from "../modal/Greeting";
import InstagramBrowser from "../modal/InstagramBrowser";
import PaymentsModal from "../modal/Payments";
import PrelendModal from "../modal/Prelend";
import Register from "../modal/Register";

const RegisterNewPage = () => {
    const { fetchRegister, email, fetchPay } = useContext(UserContext);
    const { setModal, hideModal, show } = useContext(ModalContext);

    useEffect(() => {
        if (window.navigator.userAgent.toLowerCase().includes("instagram")) {
            setModal('instagram_browser');
        } else {
            fetchRegister();
        }
    }, [])

    useEffect(() => {
        // setModal('register')
        if(email) {
            setModal('register');
        }
    }, [email])

    const showGreeting = () => {
        setModal('greeting');
    }

    const onNext = () => {
        window.location = '/';
    }

    return (
        <div className="background pic1">
            <div className="background__top"></div>
            <div className="background__bottom">
                Загрузка...
            </div>
            <Greeting onClose={() => onNext()} />
            <Register onClick={() => showGreeting()} onClose={() => showGreeting()} />
            <InstagramBrowser />
        </div>
    )
}

export default RegisterNewPage