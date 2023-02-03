import { Link } from 'react-router-dom';

import classes from './NoTasksFound.module.css';

const NoTasksFound = () => {
  return (
    <div className={classes.notasks}>
      <p>No task(s) found!</p>
      <Link className='btn' to='/addTask'>
        Add a Task
      </Link>
    </div>
  );
};

export default NoTasksFound;