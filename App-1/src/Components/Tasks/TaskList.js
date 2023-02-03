
import { Fragment } from 'react'
import classes from './TaskList.module.css'
import TaskItem from './TaskItem';
import { useNavigate, useLocation } from 'react-router-dom';


const sortTasks = (tasks, ascending) => {
    return tasks.sort((taskA, taskB) => {
        if (ascending) {
            return taskA.id > taskB.id ? 1 : -1;
        } else {
            return taskA.id < taskB.id ? 1 : -1;
        }
    });
};

const TaskList = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);//JS feature
    const isSortingAscending = queryParams.get('sort') === 'asc';
    sortTasks(props.tasks, isSortingAscending);
    const changeSortingHandler = () => {
        //navigate('/tasks?sort=' + (isSortingAscending ? 'desc' : 'asc'));
        navigate(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);
      };
    

    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}>
                    Sort {isSortingAscending ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul className={classes.list}>
                {props.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        description={task.description}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default TaskList;