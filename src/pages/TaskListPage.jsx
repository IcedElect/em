import { useContext, useEffect, useState } from "react";
import Section from "../components/Section";
import TaskList from "../components/TaskList";
import TimerPopap from "../components/TimerPopap";
import { UserContext } from "../store/user/UserContext";
import { TaskContext } from "../store/task/TaskContext";
import { Button } from "../UI";
import PrelendModal from "../modal/Prelend";
import isTimedOut from '../utils/installation';
import { ModalContext } from "../store/modal/ModalContext";
import DiscountModal from "../modal/Discount";

const TaskListPage = () => {

    const [interval, setInterval] = useState(null);
    const [tag, setTag] = useState(0);
    const [page, setPage] = useState(1);

    const { showModal, hideModal, setModal } = useContext(ModalContext);
    const { fetchCats, fetchTasks, list, loading, cats, showMore } = useContext(TaskContext);
    const {popup, fetchPay, pay, fetchSub, private_id, initUser} = useContext(UserContext);
    
    useEffect(() => {
        fetchCats()
        fetchTasks(tag, page)
    }, [tag, page])

    // useEffect((interval) => {
    //     if(!interval) {
    //         interval = setInterval(() => {
    //             if(isTimedOut('showPrelend', 3) && popup != null) {
    //                 setModal("prelend")
    //             } if(popup == null) {
    //                 hideModal("prelend")
    //             }
    //         }, 5000)
    //     }
    // }, [interval])

    useEffect(() => {
        setModal('discount')
    }, [])

    const handlePay = () => {
        if(popup?.type == 1) {
            fetchPay(popup?.tariff_id, true)
        } if(popup?.type == 2) {
            fetchSub(private_id?.tariff_id, true)
        }
    }

    const callPay = () => {
        if(popup?.type == 1) {
            fetchPay(popup?.tariff_id, true)
        } if(popup?.type == 2) {
            fetchSub(private_id?.tariff_id, true)
        }
    }

    return (
        <Section title="Предложения для Вас" id="tasks">
            <TaskList 
                tags={cats}
                filters={{tag}}
                onFilterTag={(tag) => setTag(tag)}
                data={list} 
            />
            {popup != null && <TimerPopap deadline={popup?.timer_end * 1000}/>}
            {popup != null && <DiscountModal onClick={() => callPay()}/>}
            {popup != null && <PrelendModal onClick={() => handlePay()}/>}
            {showMore && <Button style={{margin: '0 auto'}} onClick={() => setPage(prev => prev + 1)} color="main" size="large">Показать ещё</Button>}
        </Section>
    )
}

export default TaskListPage;