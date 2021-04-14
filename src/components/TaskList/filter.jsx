import { Button } from "../../UI";

const TaskListFilter = ({tags, current, onFilterTag}) => (
    <>
        {tags && <div className="tasks__filter">
            {tags && [{id: 0, caption: "Все"}, ...tags].map((item, key) => (
                <Button 
                    size="small" key={key}
                    onClick={(e) => onFilterTag(item.id)}
                    color={item.id == current ? 'main' : 'transparent'}
                >{item.caption}</Button>
            ))}
        </div>}
    </>
)

export default TaskListFilter;