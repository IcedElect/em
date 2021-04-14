import Modal from "../UI/Modal";
import {useForm} from 'react-hook-form';
import Control from "../UI/Control";
import Button from '../UI/Button';
import { ModalContext } from '../store/modal/ModalContext';
import { useContext, useEffect } from "react";
import { WithdrawalContext } from "../store/withdrawal/WithdrawalContext";
import { UserContext } from "../store/user/UserContext";
import ErrorModal from "./Error";


export default function PaymentsModal (props) {

    const {handleSubmit, register, errors}  = useForm();
    const { setModal, hideModal } = useContext(ModalContext);
    const { fetchWithdrawal, loading, success, sum } = useContext(WithdrawalContext);
    const { balance } = useContext(UserContext);
    
    const onSubmit = data => {
        if(balance == sum) {
            fetchWithdrawal(data);
        } else {
            setModal('error');
        }
    }

    useEffect(() => {
        if(success == true)
            hideModal('payments');
    })

    return (
        <Modal id="payments" title="Вывод средств">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Control
                    type="number"
                    id="card-pay"
                    name="card"
                    label="Ваша карта"
                    ref={register({
                        minLength: 16
                    })}
                    error={errors.card?.message}
                />
                <Control
                    type="number"
                    id="output-money"
                    name="sum"
                    label="минимальная сумма для вывода от 1000"
                    ref={register({
                        minLength: 4
                    })}
                    error={errors.card?.message}
                />
                <Button className="modal__dialog-button" color="main" loading={loading}>Вывести</Button>
            </form>
        </Modal>
    )
}