import { useContext, useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import Section from "../components/Section";
import ErrorModal from "../modal/Error";
import { HistoryContext } from "../store/history/historyContext";
import { ModalContext } from "../store/modal/ModalContext";
import { UserContext } from "../store/user/UserContext";
import { Button, Control } from "../UI";
import moment from "moment";
import Footer from "../components/Footer";

const HistoryPage = () => {

    const [reviewsTab, setReviewsTab] = useState('profile');
    const {profile, fetchDisSub} = useContext(UserContext);
    const {balance, fetchStories, fetchInfo} = useContext(HistoryContext);
    const { setModal, hideModal, show } = useContext(ModalContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [ansub, setAnsub] = useState(false);

    const {handleSubmit, register, errors}  = useForm({
        defaultValues: {
            card_number:profile?.card_number
        }
    });



    useEffect(() => {
        fetchStories()
    }, [])

    const handleClick = () => {
        setModal("payments");
    }

    const callClick = () => {
        setModal("password");
    }

    const disSub = (id) => {
        fetchDisSub(id)
        setAnsub(true);
        setModal('dissub')
    }

    const onSubmit = data => {
        fetchInfo(data);
    }

    const OutputMessage = {
        color: "#ff0000",
        padding: "4px",
    }

    const ComingMessage = {
        color: "#29af29",
        padding: "4px",
    }

    const sub = profile?.subscriptions
    const activeSub = profile?.subscriptions.length > 0

    const renderProfile = () => {
        return (
            <>
            <div style={{marginBottom: '20px'}} className="history-login">Ваш Логин: {profile?.login}</div>
            <Button color="main" size="small" onClick={() => callClick()}>Изменить пароль</Button>
                <form onSubmit={handleSubmit(onSubmit)}>
    
                <Control
                    type="number"
                    id="card"
                    name="card_number"
                    label="Введите ваш номер карты"
                    ref={register({
                        required: "Это поле обязательно",
                        minLength: {
                            message: 'Минимальная длина 16 символов',
                        }
                    })}
                    error={errors?.password?.message}
                />
                <small><strong>Данный номер карты будет использовать для осуществления выплат.</strong></small>
                <Control
                    type="text"
                    id="telegram"
                    name="telegram"
                    label="Telegram"
                    ref={register({
                        defaultValues: {
                            telegram:profile?.telegram
                        }
                    })}
                />
                <Control
                    type="text"
                    id="country"
                    name="country"
                    label="Страна"
                    ref={register({
                        defaultValues: {
                            country:profile?.country
                        }
                    })}
                />
                <Control
                    type="text"
                    id="city"
                    name="city"
                    label="Город"
                    ref={register({
                        defaultValues: {
                            city:profile?.city
                        }
                    })}
                />
                <div>Кто вас пригласил: {profile?.invited_by || 'Никто'}</div>
                <div>Ваша реферальная ссылка: <strong>{profile?.referral_link}</strong></div>
                <small>Приглашайте друзей и получайте 5% от их дохода</small>
                <Button className="form__button" style={{marginTop: '15px'}} size="small" color="main" loading={loading}>Сохранить</Button>
            </form>
            </>
        )
    }

    const renderBalance = () => {
        return (
            <>
            <div style={{marginBottom: "20px"}}>Подвержденный баланс: {profile?.balance} ₽</div>
            <Button color="main" size="small" onClick={() => handleClick()}>Вывод средств</Button>
            {balance.map(item => (
                <>
                    {(item.withdraw == true) &&  
                    <div style={OutputMessage}>
                        -{item.sum}₽
                        &nbsp;
                        <strong>{item.desc}</strong>
                        
                    </div>}
                    {(item.withdraw == false) &&  
                    <div style={ComingMessage}>
                        +{item.sum}₽
                        &nbsp;
                        <strong>{item.desc}</strong>
                    </div>}
                </>
            ))}
            <div className="history__sub">
            {activeSub ? sub?.map(item => (
                <>
                <h3>Ваши подписки</h3>     
                        <div className="history__sub-subtitle">
                            <span>Тариф</span>
                            <span>Дата следующего списания</span>
                        </div>
                    <div className="history__sub-table">
                        {!ansub &&
                            <>
                                <div>
                                    {item?.caption}
                                </div>
                                <div>
                                    {moment(item?.paid_till_date * 1000).format('LLL')}
                                </div>
                                <div>
                                    <Button size="small" onClick={() => disSub(item?.id)} color="main">Отменить</Button>
                                </div>
                            </>
                        }
                    </div>
                    </>
                )) : ''}
            </div>
            </>
        )
    }

    const tabs = {
        profile: renderProfile,
        balance: renderBalance
    }

    const TabComponent = tabs[reviewsTab]

    return (
        <>
        <Section title="Личный кабинет" id='tasks'>
            <div className="history__tabs">
                <Button active={reviewsTab === 'profile'} onClick={() => setReviewsTab('profile')} size="small" outline="main">
                    Профиль
                </Button>
                <Button active={reviewsTab === 'balance'} onClick={() => setReviewsTab('balance')} size="small" outline="main">
                    Баланс
                </Button>
            </div>
            <div className="history__container container">
                <div style={{display: "flex"}} className="">
                </div>
                <div style={{marginTop: "20px"}} className="row">
                    <div className="col-md-12">
                        <div className="history">

                            <TabComponent/>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal onHide={() => setError(null)}/>
        </Section>
        {/* <Footer/> */}
        </>
    )
}

export default HistoryPage;