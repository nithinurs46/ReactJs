import { useEffect, useState } from 'react';
import CreateTask from './CreateTask';
import ShowTasks from './ShowTasks';

const Home = () => {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('storedTasks')) || [])

    useEffect(() => {
        localStorage.setItem('storedTasks', JSON.stringify(taskList));
    }, [taskList]);

    return (
        <>
            <CreateTask setTaskList={setTaskList} />
            <ShowTasks taskList={taskList} setTaskList={setTaskList}/> 
        </>
    )
}

export default Home;