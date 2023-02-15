import classes from './UsersNavigation.module.css';
import { NavLink } from 'react-router-dom';

const UsersNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/users/new"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            New User
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default UsersNavigation;