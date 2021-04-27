import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from "../UI/Modal";
import { Button } from "../UI";
import { ModalContext } from "../store/modal/ModalContext";
import { useContext } from "react";
import InstagramArrow from "../assets/images/instagram_arrow.png";

export default function Greeting ({onClose}) {
    const { setModal } = useContext(ModalContext);

    const text = {
        justifyContent: "Center",
        marginTop: "20px"
    }

    const handleClick = () => {
        setModal('prelend')
    }

    return (
        <Modal id="instagram_browser" disableClose={true} onClose={onClose} title="">
            <div className="instagram__modal">
                <div className="instagram__modal-arrow">
                    <img src={InstagramArrow} />
                </div>
                <div className="instagram__modal-content">
                    Для регистрации необходимо запустить сайт в браузере Safari <br />
                    <small>(В данный момент вы находитесь в инстаграм браузере)</small>
                </div>
            </div>
        </Modal>
    )
}