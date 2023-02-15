import { Link, NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive?classes.active:undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({isActive}) => isActive?classes.active:undefined}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" className={({isActive}) => isActive?classes.active:undefined}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/newsletter" className={({isActive}) => isActive?classes.active:undefined}>Newsletter</NavLink>
                    </li>
                    <li>
                        <NewsletterSignup />
                    </li>
                    <li>
                    <NavLink to="/auth?mode=login" className={({isActive}) => isActive?classes.active:undefined}>Authentication</NavLink>
                    </li>
                </ul>
            </nav>
            
        </header>
    );
}

export default MainNavigation;