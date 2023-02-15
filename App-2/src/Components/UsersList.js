import { useLoaderData, Link } from 'react-router-dom';
import classes from './UsersList.module.css';

const UserList = ({users}) => {
    //const users = data.users;
    //const users = useLoaderData();
    return (
        <div className={classes.users}>
      <h1>Users</h1>
      <ul className={classes.list}>
        {users.map((user) => (
          <li key={user.id} className={classes.item}>
            <Link to={user.id}>
              <img src={user.image} alt={user.id} />
              <div className={classes.content}>
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default UserList;