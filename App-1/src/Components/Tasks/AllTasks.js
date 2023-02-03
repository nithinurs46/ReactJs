import { useEffect } from 'react';
import TaskLayout from "./TaskLayout";
import TaskList from "./TaskList";
import { getAllTasks } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../Layout/LoadingSpinner";
import NoTasksFound from './NoTasksFound';
import classes from "./TaskForm.module.css"
import loaderClasses from "../Layout/LoadingSpinner.module.css";

const DUMMY_TASKS = [
    { id: '1', name: 'Learn React', description: 'Learning React is fun!' },
    { id: '2', name: 'Learn Java', description: 'Learning Java is great!' },
  ];

  //sendRequest function to send the request.
  //extract status, data n error
  //assign alias to data as loadedTasks
  //send getAllTasks as pointer to useHttp and true as loading state
  const AllTasks=()=>{
    const { sendRequest, status, data: loadedTasks, error } = useHttp(
      getAllTasks,
      true
    );
    useEffect(() => {
      sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
      return (
        <div className={loaderClasses.loading}>
          <LoadingSpinner />
        </div>
      );
    }
  
    if (error) {
      return <p className='centered focused'>{error}</p>;
    }
  
    if (status === 'completed' && (!loadedTasks || loadedTasks.length === 0)) {
      return <NoTasksFound></NoTasksFound>;
    }
    return(
      <TaskLayout>
        <TaskList tasks={loadedTasks} />
      </TaskLayout>
    )
  }

  export default AllTasks;