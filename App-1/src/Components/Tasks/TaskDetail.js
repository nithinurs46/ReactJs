import { useEffect } from 'react';
import { useParams, Outlet } from "react-router-dom";
import HighlightedView from "./HighlightedView";
import TaskLayout from "./TaskLayout";
import useHttp from '../../hooks/use-http';
import { getSingleTask } from "../../lib/api";
import LoadingSpinner from "../Layout/LoadingSpinner";
import NoTasksFound from './NoTasksFound';
import loaderClasses from "../Layout/LoadingSpinner.module.css"

const DUMMY_TASKS = [
  { id: '1', name: 'Learn React', description: 'Learning React is fun!' },
  { id: '2', name: 'Learn Java', description: 'Learning Java is great!' },
];

const TaskDetail = () => {
  const params = useParams();
  const { id } = params;
  /*const task = DUMMY_TASKS.find((t) => t.id === params.taskId); //taskId is defined in app.js as route param
  if (!task) {
      return <p>No task found!</p>;
    }*/
  const { sendRequest, status, data: loadedTask, error } = useHttp(
    getSingleTask,
    true
  );

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === 'pending') {
    return (
      <div className={loaderClasses.loading}>
          <LoadingSpinner />
        </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (!loadedTask.name) {
    return <NoTasksFound />;
  }
  return (
    <TaskLayout>
      <HighlightedView name={loadedTask.name} description={loadedTask.description}></HighlightedView>
          <Outlet />
    </TaskLayout>
  )
}
export default TaskDetail;