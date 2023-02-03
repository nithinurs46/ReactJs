import React, { useState, useEffect } from 'react'
import { ReactComponent as ClockIcon } from '../../Icons/clock.svg';
import { ReactComponent as CalenderIcon } from '../../Icons/calendar.svg';
import Moment from 'react-moment';

export const DateTime = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    return (
        <div>
            <ClockIcon /> {date.toLocaleTimeString()} &nbsp;
            <CalenderIcon /> <Moment format='DD/MM/YYYY'>{date}</Moment>
        </div>
    )
}

export default DateTime;