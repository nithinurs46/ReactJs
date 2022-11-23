import { Fragment } from "react";
import classes from './TaskLayout.module.css';

const TaskLayout=(props)=>{
    return(
        <Fragment>
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    )
}

export default TaskLayout;