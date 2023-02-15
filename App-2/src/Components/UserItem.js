import { Link, useSubmit } from 'react-router-dom';
import classes from './UserItem.module.css';

const UserItem=({user})=>{
  const submit = useSubmit();
 const startDeleteHandler=()=> {
  const proceed = window.confirm('Are you sure?');
    if (proceed) {
      submit(null, { method: 'delete' });
    }
 }
    return(
<article className={classes.user}>
      <img src={user.image} alt={user.username} />
        <h1>{user.phone}</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
      <menu className={classes.actions}>
      <Link to="edit">Edit</Link>
      <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
    )
}
export default UserItem;