import { Link, NavLink } from 'react-router-dom';
import LogoImg from '../../assets/images/ic_launcher.png'

import { faChartLine, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { UserContext } from '../../store/user/UserContext';

const Header = () => {

    const {profile, private_id, logout} = useContext(UserContext);

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <Link to="/" className="header__logo col-md-1">
                        <img src={LogoImg} />
                    </Link>
                    <div className="header__menu col-md-8">
                        <NavLink to="/" exact={true} className="header__menu-link"><FontAwesomeIcon className="far" icon={faHome}/> Предложения</NavLink>
                        {private_id?.type != null && <NavLink to="/pro" className="button button--main header-button header__menu-link"><FontAwesomeIcon className="far" icon={faChartLine}/>  Увеличенный доход</NavLink>}
                    </div>
                    <Link to="/history" className="header__profile d-flex col-md-3">
                        <FontAwesomeIcon icon={faUser} className="header__profile-avatar"/>
                        <div className="header__profile-info">
                            <div className="header__profile-id">Личный профиль #{profile?.id}</div>
                            {/* <a onClick={logout}>выйти</a> */}
                            <div className="header__profile-balance">Баланс: <span>{profile?.balance_full} ₽</span></div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;