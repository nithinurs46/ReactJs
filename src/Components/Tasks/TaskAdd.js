import { useNavigate } from 'react-router-dom';
import TaskForm from "./TaskForm";
import useHttp from '../../hooks/use-http';
import { addTask} from '../../lib/api';
import { useEffect } from 'react';

const TaskAdd=()=>{
    const { sendRequest, status } = useHttp(addTask);
    const navigate = useNavigate ();
    useEffect(() => {
        if (status === 'completed') {
            navigate('/tasks');
        }
      }, [status, navigate]);
    const addTaskHandler=(data)=>{
        sendRequest(data);
    }
    return(
        <TaskForm isLoading={status === 'pending'} onAddTask={addTaskHandler}></TaskForm>
    )
}

export default TaskAdd;