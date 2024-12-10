import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import { useState } from 'react';
import dayjs from 'dayjs';

const CreateTask = ({ setTaskList }) => {
    const [task, setTask] = useState('');
    const [dateTime, setDateTime] = useState(dayjs().format('YYYY-MM-DD HH:mm'));
    const [taskError, setTaskError] = useState(false);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
        if (!event.target.value) {
            setTaskError(true);
        }
    }
    const handleDateTimeChange = (newValue) => {
        setDateTime(newValue ? newValue.format('YYYY-MM-DD HH:mm') : null);
    };

    const addTask = () => {
        let hasError = false;
        if (!task) {
            setTaskError(true);
            hasError = true;
        }
        if (!hasError) {
            setTaskError(false);
            const uniqueId = dayjs().format('YYYY-MM-DD HH:mm:ss');
            //setTaskList([...taskList, { name: task, dueDate: dateTime }]);
            let dateVal = dateTime;
            if (!dateTime) {
                dateVal = dayjs().format('YYYY-MM-DD HH:mm');
                setDateTime(dayjs().format('YYYY-MM-DD HH:mm'));
            }
            setTaskList((prevTaskList) => {
                const newTaskList = [...prevTaskList, { name: task, dueDate: dateVal, id: uniqueId }];
                return newTaskList;
            });

            setTask('');
            setDateTime('');
        }
    }


    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex', // Align items in a row
                    alignItems: 'center', // Vertically align them in the center
                    justifyContent: 'center', // Horizontally center the content
                    flexDirection: 'row', // Align the items in a row
                    gap: 2, // Space between the elements
                    '& .MuiTextField-root': { m: 1, width: '35ch' }, // Spacing for the TextField
                    '& .MuiButton-root': { m: 1 }, // Spacing for the Button
                    position: 'absolute', // Position relative to allow movement
                    top: '70px', // Move the form down 50px from the top (use negative for up)
                    //height: '100vh', // Ensure the form's container takes full height of the viewport
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField label="Task" id="outlined-size-normal" value={task}
                        onChange={handleTaskChange}
                        error={taskError}
                        helperText={taskError ? "Task is required" : ""} />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Date & Time" onChange={handleDateTimeChange}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" size="large" onClick={addTask} >Create</Button>
                </div>
            </Box>
        </>
    )
}

export default CreateTask;