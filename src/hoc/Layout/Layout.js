import TagManager from 'react-gtm-module';
import { ModalState } from '../../store/modal/ModalState';
import Router from "../Router";
import { TaskState } from "../../store/task/TaskState";
import {UserState} from '../../store/user/UserState';
import { WithdrawalState } from '../../store/withdrawal/WithdrawalState';
import { HistoryState } from "../../store/history/historyState";
import PaymentsModal from '../../modal/Payments';
import PasswordModal from '../../modal/Password';
import DisSubModal from '../../modal/DIsSub';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../store/user/UserContext';
import { TG_MANAGER_GTM_ID } from '../../config';
import { ModalContext } from '../../store/modal/ModalContext';
import IosModal from '../../modal/Ios';

const Layout = () => {
    const {profile} = useContext(UserContext);
    const {setModal} = useContext(ModalContext);

    const tagManagerArgs = {
        gtmId: TG_MANAGER_GTM_ID,
        dataLayer: {
            userId: profile?.id,
            'event': 'registerJS'
        }
    }

    function isIOSAndInstagram() {
        let ua = navigator.userAgent.toLowerCase();
        return (ua.indexOf('instagram') !== -1 && (ua.indexOf('iphone') !== -1 || ua.indexOf('ipod') !== -1 || ua.indexOf('ipad') !== -1));
    }

    // useEffect(() => {
    //     if(navigator.userAgent.includes("Instagram")) {
    //         setModal('ios')
    //         window.location.href="easyworkapp.ru" 
    //     }
    // },[])

    if(process.env.NODE_ENV != "development")
        TagManager.initialize(tagManagerArgs);

    const pkg = findGetParameter('pkg')
    if(pkg)
        localStorage.setItem('pkg', pkg)

    const aaid = findGetParameter('aaid')
    if(aaid)
        localStorage.setItem('aaid', aaid)

    const appmetrica_device_id = findGetParameter('appmetrica_device_id')
    if(appmetrica_device_id)
        localStorage.setItem('appmetrica_device_id', appmetrica_device_id)

    const appsflyer_id = findGetParameter('appsflyer_id')
    if(appsflyer_id)
        localStorage.setItem('appsflyer_id', appsflyer_id)

    const ref = findGetParameter('ref')
    if(ref)
        localStorage.setItem('ref', ref)

    const campaignName = findGetParameter('cn')
    if(campaignName)
        localStorage.setItem('cn', campaignName)

    const utm_adset = findGetParameter('utm_adset')
    if(utm_adset)
        localStorage.setItem('utm_adset', utm_adset)

    const clickID = findGetParameter('cid')
    if(clickID)
        localStorage.setItem('cid', clickID)

    const GProCID = findGetParameter('gpro_cid')
    if(GProCID)
        localStorage.setItem('gpro_cid', GProCID)

    return (
        <UserState>
            <ModalState>
                <TaskState>
                    <WithdrawalState>
                        <HistoryState>
                            <Router>
                                {children => <>{children}</>}
                            </Router>
                            <PasswordModal/>
                            <PaymentsModal/>
                            <DisSubModal/>
                            <IosModal/>
                        </HistoryState>
                    </WithdrawalState>
                </TaskState>
            </ModalState>
        </UserState>
    )
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    document.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

export default Layout;