import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from "../UI/Modal";
import { Button } from "../UI";
import { ModalContext } from "../store/modal/ModalContext";
import { useContext } from "react";

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
        <Modal id="greeting" disableClose={true} onClose={onClose} title="Благодаря данному сайту ты сможешь открыть для себя новый источник дохода. Ничего сложного! Выполняй задания и зарабатывай реальные деньги.">
            <div className="prelend">
                <div className="prelend__content">
                    <div className="prelend__content-title">Этот сайт подойдет тебе, если:</div>
                    <div className="prelend__content-list">
                        <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Ты лишился работы из-за коронавируса и пытаешься встать на ноги</div>
                        <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Ты бедный студент, который просто хочет жить нормально, не в чем себе не отказывая</div>
                        <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Ты учишься в школе и пытаешься заработать свои первые деньги в интернете</div>
                        <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>У тебя есть свободное время, которое ты можешь и хочешь проводить с пользой</div>
                    </div>
                    <Button onClick={onClose} color={"main"} style={text}>Продолжить</Button>
                    {/* <a href="/" style={text} type="button" className="button button--main">Продолжить</a> */}
                </div>
            </div>
        </Modal>
    )
}