import { useEffect, useState } from "react";

export default function Timer({dl}) {
    const [seconds, setSeconds] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [hours, setHours] = useState('00');
    const [x, setX] = useState(null);
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        if(dl) {
            const x = setInterval(count,1000);
        }

        return () => {
            clearInterval(x);
        }
    },[dl])

    const count = () => {
        
        const now = new Date().getTime();
        const t = dl - now;
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

    return (
        <div className={'prelend-timer'}>
            <div className={'prelend-timer-title'}>Предложение ограничено:</div>
            <div className={'prelend-timer-inner'}>
                <div className="prelend-timer-item">
                    {hours.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                </div>
                <div className={'prelend-timer-sep'}>:</div>
                <div className={'prelend-timer-item'}>
                    {minutes.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                </div>
                <div className={'prelend-timer-sep'}>:</div>
                <div className={'prelend-timer-item'}>
                    {seconds.padStart(2, 0).split('').map(n => (<span><i>{n}</i></span>))}
                </div>
            </div>
            <small style={{fontSize: '10px'}}>Доступ к тарфу PRO на неделю за 1₽, далее по тарифу</small>
        </div>
    )
}