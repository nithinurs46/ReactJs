import classes from './TaskItem.module.css';
import { Link } from 'react-router-dom';

const TaskItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.name}</p>
        </blockquote>
        <figcaption>{props.description}</figcaption>
      </figure>
      <Link className='btn' to={`/tasks/${props.id}`}>
        View Details
      </Link>
    </li>
  );
};

export default TaskItem;