import {useContext, useEffect} from "react";
import {UserContext} from "../store/user/UserContext";
import Loading from "../components/Loading";
import { ModalContext } from "../store/modal/ModalContext";
import Modal from "../UI/Modal";
import Greeting from "../modal/Greeting";
import PaymentsModal from "../modal/Payments";
import PrelendModal from "../modal/Prelend";

const RegisterNewPage = () => {
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
            <PrelendModal />
        </div>
    )
}

export default RegisterNewPage