import { useContext, useEffect, useState } from "react";
import { YMInitializer } from "react-yandex-metrika";
import ym from 'react-yandex-metrika';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Tabbar from "../../components/Tabbar/Tabbar";
import { UserContext } from "../../store/user/UserContext";
import { YM_TOKENS } from "../../config";

const DefaultContainer = ({children, classes}) => {

    const { initUser, ready, profile, jivoShow, ShowJivo } = useContext(UserContext);
    
    useEffect(() => {
      initUser();
    }, [])

    const jivo = profile?.payload_src;

    useEffect(() => {
        if(!jivoShow && jivo) {
            ShowJivo(true)
        
            const script = document.createElement('script');
            script.src = jivo;
            script.async = true
            document.body.appendChild(script);
        }
    }, [jivoShow])

    useEffect(() => {
        if(profile?.id != null)
            ym('setUserID', profile?.id);
    }, [])
    
    
    return (
        <>
            { 
            ready ?
            <>
                <YMInitializer accounts={YM_TOKENS} options={{
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true,
                    }}
                    >
                        
                    <Header />
                        <main className={classes}>{children}</main>
                    <Tabbar/>
                    <Footer/>
                </YMInitializer>
                </> : <Loading/>
            }
        </>
    )
}
export default DefaultContainer;