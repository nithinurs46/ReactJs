import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';
import React, {useState} from "react";

//function ExpenseItem (props) {
const ExpenseItem = (props) => {

  //array destructing concept
  const [oldTitle, newTitle] = useState(props.title);

  const clickHandler = () =>{
    newTitle('updated!!')
  }

  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{oldTitle}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Update Title</button>
    </Card>
  );
}

export default ExpenseItem;