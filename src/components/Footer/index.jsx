import LogoImg from '../../assets/images/ic_launcher.png';
import { HELP_EMAIL, OFERTA_URL, COMPANY } from "../../config";

const Footer = () => {

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={LogoImg} alt="logo"/>
                    </div>
                    <div className="col-md-4">
                        <div className="footer__contact">
                            <div className="footer__contact-title">Контакты</div>
                            <div className="footer__contact-body">
                                <a href={ 'mailto:' + HELP_EMAIL }>{ HELP_EMAIL }</a>
                                <a href={ OFERTA_URL }>{ COMPANY }</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <a href="/history" size="small" className="dissub" color="transparent">Отменить подписку</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;