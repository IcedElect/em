import { NavLink } from "react-router-dom";
import { faChartLine, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { UserContext } from "../../store/user/UserContext";

const Tabbar = () => {

    const {private_id} = useContext(UserContext);

    return (
        <div className="tabbar">
            <div className="tabbar__inner">
                <div className="tabbar__menu">
                    <NavLink className="tabbar__menu-link" exact to="/">
                        <span className="tabbar__menu-link-icon"><FontAwesomeIcon className="far" icon={faHome}/></span>
                        <span className="tabbar__menu-link-text">Предложения</span>
                    </NavLink>
                    {private_id?.type != null && <NavLink className="tabbar__menu-link" to="/pro">
                        <span className="tabbar__menu-link-icon"><FontAwesomeIcon className="far" icon={faChartLine}/></span>
                        <span className="tabbar__menu-link-text">Увеличенный доход</span>
                    </NavLink>}
                    <NavLink className="tabbar__menu-link" to="/history">
                        <span className="tabbar__menu-link-icon"><FontAwesomeIcon icon={faUser} className="header__profile-avatar"/></span>
                        <span className="tabbar__menu-link-text">Личный кабинет</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Tabbar;