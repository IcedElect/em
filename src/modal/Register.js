import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../store/modal/ModalContext";
import { UserContext } from "../store/user/UserContext";
import Button from "../UI/Button";
import Control from "../UI/Control";
import Modal from "../UI/Modal";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

export default function Register ({onClick, onClose, to}) {

    const {handleSubmit, register, errors}  = useForm();
    const { setModal, hideModal, show } = useContext(ModalContext);
    const { isAuthorized, email, password } = useContext(UserContext);

    const onSubmit = data => {
        // fetchRegister(data)
    };

    // useEffect(() => {
    //     if(isAuthorized && show.indexOf('register') > -1) {
    //         hideModal('register')
    //     }
    // }, [isAuthorized])

    return (
        <Modal id="register" title="Регистрация" disableClose={true} onClose={onClose}>
            <div className="register">
                <p style={{textAlign: "center"}}>Сохраните Ваш логин и пароль</p>
                <div className="register__inner">
                    <div className="register__inner-email">{email}</div>
                    <div className="register__inner-password">{password}</div>
                    <CopyToClipboard text={email + ' ' + password}>
                        <Button style={{width: 'auto'}} tooltip="Скопировано в буфер обмена"><FontAwesomeIcon icon={faCopy} style={{color: "#7312af"}}/></Button>
                    </CopyToClipboard>
                    {/* <ReactTooltip effect="float" place="top" event="mouseup" /> */}
                </div>
                <small>*Нажмите на кнопку скопировать в буфер обмена и сохраните данные для входа себе в блокнот, это нужно, чтобы вы не потеряли доступ к своему личному кабинету </small>
                <Button onClick={onClick} to={to} color={"main"} style={{width: 'auto'}}><span>Продолжить</span></Button>
            </div>
        </Modal>
    );
}