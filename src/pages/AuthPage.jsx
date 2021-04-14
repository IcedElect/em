import Section from "../components/Section";

import {useForm} from 'react-hook-form';
import { Button, Control } from "../UI";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user/UserContext";
import Register from "../modal/Register";

const AuthPage = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {handleSubmit, register, errors}  = useForm();
    
    const { fetchLogin } = useContext(UserContext);

    const onSubmit = data => {
        fetchLogin(data)
    };

    return (
        <Section title="Войти в аккаунт" id="auth">
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
                <div className="d-flex w-100">
                    <Control type="checkbox" label="Запомнить меня" />
                    <small style={{flex: 1, textAlign: 'right'}}><a onClick={() => ({})}>Забыли пароль?</a></small>
                </div>
                <Button className="form__button" color="main" loading={loading}>Войти</Button>
                <small>Нужен аккаунт? <b><Link to="/register">Регистрация</Link></b></small>
            </form>
        </Section>
    )
}

export default AuthPage;