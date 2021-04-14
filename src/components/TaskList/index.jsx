import TaskListFilter from "./filter";
import { Button } from "../../UI";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { UserContext } from "../../store/user/UserContext";
import { useContext } from "react";
import { ModalContext } from "../../store/modal/ModalContext";

const TaskList = ({data, onFilterTag, filters, tags}) => {

    const {popup} = useContext(UserContext);
    const { setModal } = useContext(ModalContext);

    console.log(data)

    const HandleClick = (item) => {
            if(item?.private) {
                setModal('discount')
            } else {
                window.location = `/task/${item?.id}`
            }
    }

    return (
    <div className="tasks">
        {filters && <TaskListFilter tags={tags} current={filters?.tag} onFilterTag={onFilterTag} />}
        <div className="tasks__list">
            {data.map((item, key) => (
                <>
                <span key={key} onClick={() => HandleClick(item)} className="tasks__item">
                    <div className="tasks__item-thumb">
                        <img src={item?.img} />
                    </div>
                    <div className="tasks__item-content">
                        <div className="tasks__item-title">
                            <span>{item?.caption}</span>
                            {item?.private && <FontAwesomeIcon className="far" icon={faLock}/>}
                        </div>
                        <div className="tasks__item-description">{item?.desc}</div>
                        <div className="tasks__item-tags">
                            {item?.status == 2 && <div className="tasks__item-tags-item">New</div>}
                            {item?.status == 1 && <div className="tasks__item-tags-item">Hot</div>}
                        </div>
                    </div>
                    <div className="tasks__item-actions">
                        {item?.type == 1 && <Button color="main" iconPos="right">{item?.profit} ₽</Button>}
                    </div>
                </span>
                {popup != null && [2, 9, 15, 22, 28].indexOf(key) != -1 ? <div className="tasks__sale">
                <h2>Ограниченное предложение!</h2><div className="tasks__sale-actions"><Button onClick={() =>{setModal('discount')}}>Подробнее</Button></div></div> : ''}
                </>
            ))}
        </div>
    </div>
    )
}

export default TaskList;