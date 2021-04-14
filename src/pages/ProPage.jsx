import Section from "../components/Section";
import { Button } from "../UI";
import PRO from '../assets/images/pro.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../store/user/UserContext";
import { useContext, useState } from "react";
import {OFERTA_URL} from "../config";

const ProPage = () => {

    // const [loading, setLoading] = useState(false);
    const { fetchSub, private_id, loading } = useContext(UserContext);
    const handlePay = () => {
        fetchSub(private_id.tariff_id, true)
    }

    const info = private_id?.lines;

    return (
        <>
            <div className="overlay"></div>
            <Section id="auth">
                <div className="pro">
                    <div className="pro__title">PRO</div>
                    <img src={PRO} className="pro__icon"></img>
                    <div className="pro__price"><span>Тариф</span> <b>{private_id?.price}₽</b> <span>/ нед</span></div>
                    <ul className="pro__list">
                        {info?.map(item => (
                            <li className="pro__list-item"><FontAwesomeIcon icon={faCheck}/>{item}</li>
                        ))}
                    </ul>
                    <Button className="pro__button w-100" size="large" color="main" target="_blank" loading={loading} onClick={() => handlePay()}>Активировать</Button>
                <div className={'prelend-police'}>Нажимая на кнопку, вы соглашаетесь с условиями <a href={ OFERTA_URL }>публичной оферты</a>, действующим и <a href={ OFERTA_URL }>тарифами</a> сервиса, даете свое <a href={ OFERTA_URL }>согласие на обработку персональных данных</a> и на получение рекламных материалов, осознаете возмездный характер оказываемых услуг.</div>
                </div>
            </Section>
        </>
    )
}

export default ProPage