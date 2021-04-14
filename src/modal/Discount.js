import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from "../UI/Modal";
import Button from '../UI/Button';
import { useContext, useEffect, useState } from "react";
import Timer from "../components/Prelend";
import { UserContext } from "../store/user/UserContext";
import { ModalContext } from "../store/modal/ModalContext";
import { OFERTA_URL } from "../config";
import { Redirect } from "react-router";

export default function DiscountModal () {

    // const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { setModal, hideModal } = useContext(ModalContext);
    const {popup, fetchPay, pay, fetchSub, private_id, success, initUser, loading} = useContext(UserContext);

    const handlePay = () => {

        if(popup?.type == 1) {
            fetchPay(popup?.tariff_id, true)
        } if(popup?.type == 2) {
            fetchSub(private_id?.tariff_id, true)
        }
        setRedirect(true);
    }

    const info = popup?.lines;

    return (
        <Modal id="discount" title="СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ ТОЛЬКО ДЛЯ НОВЫХ ПОЛЬЗОВАТЕЛЕЙ">
            <div className="prelend">
                <div className="prelend__content">
                    <div className="prelend__content-title">Возможность получить доступ к Тарифу “PRO” по суперцене!</div>
                        <div className="prelend__content-list">
                            <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Доступ к приватным заданиям</div>
                            <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Повышенное вознаграждение за их выполнение</div>
                            <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Новые задания</div>
                            <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Автоматические выплаты</div>
                            <div className="prelend__content-list-item"><FontAwesomeIcon icon={faCheck}/>Круглосуточная поддержка</div>
                    </div>
                    <div className="prelend__button">
                        <div className="prelend__content-row">
                            <div className="prelend__content-row__price-old">Тариф <span>1990₽</span></div>
                            <div className="prelend__content-row__price-new"><strong>1₽*</strong><small>/нед</small></div>
                        </div>
                        <Button type="button" color="main" loading={loading} onClick={() => handlePay()}>Продолжить</Button>
                    </div>
                    <Timer dl={popup.timer_end * 1000}/>
                    {/*<Button type="button" color="main" loading={loading} onClick={() => handlePay()}>Продолжить</Button>*/}
                </div>
                <div className={'prelend-police'}>Нажимая на кнопку, вы соглашаетесь с условиями <a href={ OFERTA_URL } target="_blank">публичной оферты</a>, действующим и <a href={ OFERTA_URL } target="_blank">тарифами</a> сервиса, даете свое <a href={ OFERTA_URL } target="_blank">согласие на обработку персональных данных</a> и на получение рекламных материалов, осознаете возмездный характер оказываемых услуг.</div>
            </div>
        </Modal>
    )
}