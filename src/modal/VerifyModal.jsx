import Modal from "../UI/Modal";
import {Button} from "../UI";
import {ModalContext} from "../store/modal/ModalContext";
import {useContext} from "react";
import {OFERTA_URL} from "../config";

export default function VerifyModal ({onClose}) {
    const { setModal } = useContext(ModalContext);

    const text = {
        justifyContent: "Center",
        marginTop: "20px"
    }

    return (
        <Modal id="verify" disableClose={true} onClose={onClose} title="Активация подписки">
            <div className="prelend">
                <div className="prelend__content">
                    <div className="prelend__content-title">Уважаемые пользователи, во избежании накрутки нашего сервиса ботами мы внесли обязательную верификацию каждого нового пользователя</div>
                    <div className="prelend__content-list">
                        Данная мера позволяет избежать создания тысячи профилей одним человеком. Благодаря этому easywork остается <b>безопасным</b> и <b>надежным</b> сервисом выполнения легких заданий.
                    </div>
                    <div className="prelend__button">
                        <div className="prelend__content-row">
                            <div className="prelend__content-row__price-old">Тариф <span>1990₽</span></div>
                            <div className="prelend__content-row__price-new"><strong>1₽*</strong><small>/нед</small></div>
                        </div>
                        <Button type="button" color="main" onClick={onClose}>Активировать</Button>
                    </div>
                </div>
                <div className={'prelend-police'}><br/><br/>Нажимая на кнопку, вы соглашаетесь с условиями <a href={ OFERTA_URL } target="_blank">публичной оферты</a>, действующим и <a href={ OFERTA_URL } target="_blank">тарифами</a> сервиса, даете свое <a href={ OFERTA_URL } target="_blank">согласие на обработку персональных данных</a> и на получение рекламных материалов, осознаете возмездный характер оказываемых услуг.</div>
            </div>
        </Modal>
    )
}