import { Card } from "@mui/material"
import TaskLayout from "./TaskLayout"
import classes from "./TaskForm.module.css"
import { useRef, useState } from 'react';
import LoadingSpinner from "../Layout/LoadingSpinner";
import loaderClasses from "../Layout/LoadingSpinner.module.css";

const isEmpty = value => value.trim() === '';
const TaskForm = (props) => {
    const nameInputRef = useRef();
    const descInputRef = useRef();
    const [isDirty, setIsDirty] = useState(false);
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        description: true
    });
    const submitFormHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredDesc = descInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredDescIsValid = !isEmpty(enteredDesc);

        setFormInputsValidity({
            name: enteredNameIsValid,
            description: enteredDescIsValid
        })

        const isFormValid = enteredNameIsValid && enteredDescIsValid;

        if (!isFormValid) {
            return;
        }
        props.onAddTask({
            name: enteredName,
            description: enteredDesc
        })
    }

    const formFocusedHandler = () => {
        setIsDirty(true);
    }
    const finishEnteringHandler = () => {
        setIsDirty(false);
    }
    //If field contains data, then add class.control style else add classes.invalid style
    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid
        }`;

    const descControlClasses = `${classes.control} ${formInputsValidity.description ? '' : classes.invalid
        }`;
    return (
        <TaskLayout>
            {/* Prompt is currently not supported yet by v6 */}
            {/* <Prompt
        when={isEntering}
        message={(location) =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      /> */}
            <Card style={{ padding: "12px" }}>
                <form className={classes.form} onSubmit={submitFormHandler} onFocus={formFocusedHandler}>
                    {props.isLoading && (
                        <div className={loaderClasses.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    <div className={nameControlClasses}>
                        <label htmlFor='name'>Task Name</label>
                        <input type='text' id='taskName' ref={nameInputRef} />
                        {!formInputsValidity.name && <p>Please enter task name</p>}
                    </div>
                    <div className={descControlClasses}>
                        <label htmlFor='description'>Description</label>
                        <textarea id='taskDesc' rows='5' ref={descInputRef}></textarea>
                        {!formInputsValidity.description && <p>Please enter the description</p>}
                    </div>
                    <div className={classes.actions}>
                        <button onClick={finishEnteringHandler} >Add Task</button>
                    </div>
                </form>
            </Card>
        </TaskLayout>
    )
}
export default TaskForm;