import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HistoryContext } from "../store/history/historyContext";
import { ModalContext } from "../store/modal/ModalContext";
import { Button, Control } from "../UI";
import Modal from "../UI/Modal";


export default function PasswordModal (props) {

    const { setModal, hideModal, show } = useContext(ModalContext);
    const { updatePassword, success } = useContext(HistoryContext);
    const {handleSubmit, register, errors}  = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(success == true) {
            hideModal('password');
        } if(success == false) {
            setModal('error');
        }
    }, [])
    const onSubmit = (data) => {
        updatePassword(data);
        hideModal('password');
    }

    return (
        <Modal id="password" title="Придумать новый пароль">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Control
                    type="password"
                    name="password"
                    label="Новый пароль"
                    ref={register({
                        required: "Это поле обязательно",
                        minLength: {
                            value: 6,
                            message: 'Минимальная длина 6 символов'
                        }
                    })}
                    error={errors?.password?.message}
                />
                <Control
                    type="password"
                    name="reap-password"
                    label="Повторите пароль"
                    error={errors?.password?.message}

                />
                <Button className="form__button" color="main" onClick={() => setLoading(true)}>Сохранить</Button>
            </form>
        </Modal>
    )
}