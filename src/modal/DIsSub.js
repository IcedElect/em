import Modal from "../UI/Modal";


export default function DisSubModal ({onHide}) {
    return (
        <Modal id="dissub" error="Вы отписались" onHide={onHide}>
            <div className="modal__dialog-text">
                Нас будет Вас не хватать
            </div>
        </Modal>
    )
}