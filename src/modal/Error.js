import Button from "../UI/Button";
import Modal from "../UI/Modal";


export default function ErrorModal ({onHide}) {
    return (
        <Modal id="error" error="Ошибка" onHide={onHide}>
            <div className="modal__dialog-text">
                Проверьте подвержденный баланс
            </div>
        </Modal>
    )
}