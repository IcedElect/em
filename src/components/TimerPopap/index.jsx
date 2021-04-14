import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../store/modal/ModalContext";

const TimerPopap = ({deadline}) => {
    const { setModal } = useContext(ModalContext);

    const [seconds, setSeconds] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [hours, setHours] = useState('00');
    const [x, setX] = useState(null);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        if(deadline){
            const x = setInterval(count,1000);
        }

        return () => {
            clearInterval(x);
        }
    },[deadline])

    const count = () => {
        const now = new Date().getTime();
        const t = deadline - now;
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
        const seconds = Math.floor((t % (1000 * 60)) / 1000).toString();
        setMinutes(minutes);
        setHours(hours);
        setSeconds(seconds);
        if (t < 0 || typeof days == "number") {
            setEnded(true);
        }
    }

    const handleClick = () => {
        setModal("prelend");
    }
    
    return (
        <>
        {hours != 0 ? <div className="timer" onClick={() => handleClick()}>
            <div className="timer__inner">
                <div className="timer__inner-title">Скидка</div>
                <div className="timer__item">
                    <div className="timer__item-number">
                        {hours.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                    </div>
                    <div className="timer__item-sep">:</div>
                    <div className="timer__item-number">
                        {minutes.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                    </div>
                    <div className="timer__item-sep">:</div>
                    <div className="timer__item-number">
                        {seconds.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                    </div>
                </div>
            </div>
        </div> : ''}
        </>
    )
}

export default TimerPopap;