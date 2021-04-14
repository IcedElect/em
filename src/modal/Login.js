import { useContext, useEffect } from 'react';
import Button from '../UI/Button';
import Control from "../UI/Contcrol";
import Modal from "../UI/Modal";
import {useForm} from 'react-hook-form';
import { UserContext } from '../store/user/UserContext';
import { ModalContext } from '../store/modal/ModalContext';

export default function Login (props) {

    const {handleSubmit, register, errors}  = useForm();
    const { setModal, hideModal, show } = useContext(ModalContext);
    const { fetchLogin, error, loading, isAuthorized } = useContext(UserContext);

    const onSubmit = data => {
        fetchLogin(data)
    };

    useEffect(() => {
        if(isAuthorized && show.indexOf('login') > -1) 
            hideModal('login')
    })

    return (
        <Modal id="login" title="Логин">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Control 
                    type="email" 
                    id="login-email" 
                    name="email" 
                    label="E-mail" 
                    ref={register({
                        required: 'Это поле обязательно'
                    })}
                    error={errors.email?.message}
                />
                <Control 
                    type="password" 
                    id="login-password" 
                    name="password" 
                    label="Пароль" 
                    ref={register({
                        required: 'Это поле обязательно'
                    })}
                    error={errors.password?.message || error}
                />
                <div className="modal__dialog-row">
                    <Control type="checkbox" label="Запомнить меня" />
                    <small><a className="underline" onClick={() => setModal('forgotPass')}>Забыли пароль?</a></small>
                </div>
                <Button className="modal__dialog-button" color="main" loading={loading}>Войти</Button>
                <small>Нужен аккаунт? <b><a className="underline" onClick={() => setModal('register')}>Регистрация</a></b></small>
            </form>
        </Modal>
    );
}