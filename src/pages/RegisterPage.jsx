import Section from "../components/Section";

import {useForm} from 'react-hook-form';
import { Button, Control } from "../UI";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../store/modal/ModalContext";
import { UserContext } from "../store/user/UserContext";
import Register from "../modal/Register";
import Greeting from "../modal/Greeting";
import PrelendModal from "../modal/Prelend";
import InstagramBrowser from "../modal/InstagramBrowser";

const RegisterPage = () => {

    const { setModal } = useContext(ModalContext);

    const [error, setError] = useState(false);
    const {handleSubmit, register, errors}  = useForm();

    const { fetchRegister, email, id, ios, popup, private_id, tariff_id, fetchPay, fetchSub, fetchEmailRegister, loading, loader } = useContext(UserContext);

    useEffect(() => {
        if (window.navigator.userAgent.toLowerCase().includes("instagram"))
            setModal('instagram_browser');
    }, [])

    const handleClick = () => {
        if(navigator.userAgent.includes("Instagram")) {
            setModal('ios');
        } else {
            fetchRegister()
            showRegisterModal()
        }
    }

    const showRegisterModal = () => {
        setModal("register")
    }

    const showGreetingModal = () => {
        setModal("greeting")
    }

    const onSubmit = (data) => {
        if(navigator.userAgent.includes("Instagram")) {
            setModal('ios');
        } else {
            fetchEmailRegister(data)
        }
        // alert('123123')
        // showGreetingModal()
    }

    const handlePay = () => {
        if(popup?.type == 1) {
            fetchPay(popup?.tariff_id, true)
        } if(popup?.type == 2) {
            fetchSub(private_id?.tariff_id, true)
        }
    }

    return (
        <Section title="Создать аккаунт" id="auth">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Control 
                    type="email" 
                    id="login-email" 
                    name="email" 
                    label="E-mail" 
                    ref={register({
                        required: 'Это поле обязательно'
                    })}
                    error={errors.email ? errors.email.message : null}
                />
                <Control
                    type="password" 
                    id="login-password" 
                    name="password" 
                    label="Пароль" 
                    ref={register({
                        required: 'Это поле обязательно'
                    })}
                    error={errors.password ? errors.password.message : (error || null)}
                />
                <Button className="form__button" color="main" loading={loading}>Создать аккаунт</Button>
            </form>
            <small>или</small>
            <Button className="" color="main" loading={loading} onClick={() => handleClick()}>
                Регистрация в 1 клик
            </Button>
                <small>Уже есть аккаунт? <b><Link to="/login">Войти</Link></b></small>
            <Register to='/'/>
            <Greeting/>
            <InstagramBrowser />
            {popup != null && <PrelendModal onClick={() => handlePay()}/>}
        </Section>
    )
}

export default RegisterPage