import Modal from "../UI/Modal";


export default function IosModal ({onHide}) {
    return (
        <Modal id="ios" title="Вы отписались" onHide={onHide}>
            <div className="modal__dialog-text">
                Для регистрации необходимо запустить сайт в браузере Safari. (В данный момент вы находитесь в инстаграм браузере)
            </div>
            <a href="easyworkapp.ru" type="button" className="button button--main">Перейти</a>
        </Modal>
    )
}