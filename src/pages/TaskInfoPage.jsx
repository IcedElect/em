import {Button} from '../UI';
import Section from "../components/Section";
import { TaskContext } from '../store/task/TaskContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const TaskInfoPage = () => {

    const { id } = useParams();
    const { fetchTask, single, loading, error } = useContext(TaskContext);

    useEffect(() => {
        fetchTask(id)
    }, [id])

    if(!single.id) {
        return <Loading/>
    }

    return (
        <>
            <Section id="task">
                <div className="task">
                    <img className="task-icon" src={single.img}/>
                    <div className="task__cover">
                        <img src={single.bg_img} />
                        {single?.status == 2 && <div className="task__tag">New</div>}
                        {single?.status == 1 && <div className="task__tag">Hot</div>}
                        <div className="task__title">
                            <div className="task__title-text">{single?.caption}</div>
                        </div>
                    </div>
                    <div className="task__content">
                        <div className="row justify-content-center">
                            <div className="task__actions col-md-10" >
                            {single.desc?.map(item => (
                                <>
                                    {!!(item?.type == "warn") && <Button className={`task__actions-${item.type}`}>{item.data}</Button>}
                                    {!!(item?.type == "note") && <Button className={`task__actions-${item.type}`}>{item.data}</Button>}
                                    {!!(item?.type == "text") && <div>{item.data}</div>}
                                    {!!(item?.type == "html") && <div dangerouslySetInnerHTML={{__html: item.data}}></div>}
                                    {!!(item?.type == "img") && <div style={{textAlign: "center"}}><img style={{maxWidth: '100%', display: 'inline-block', margin: '0 auto'}} src={item.data}/></div>}
                                </>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="container taskButton">
                        {single.type == 1 && <Button href={single.url} rel="noreferrer" target="_blank" as="a" className="w-100" dangerouslySetInnerHTML={{__html: single.data}} size="large" color="main">+{single.profit}₽</Button> || single.type == 4 && ''}
                    </div>
                </div>
            </Section>
        </>
    )
}

export default TaskInfoPage;