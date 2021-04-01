import React from "react";
export default function Todo({todo,todolist,setTodoList}){
    //Handles the deletion of todo
    const deleteHandler=()=>{
        setTodoList(todolist.filter((item)=>item.id!==todo.id))
    }

    //Handles the completion of todo
    const completeHandler=()=>{
        setTodoList(todolist.map((item)=>{
            if(item.id===todo.id){
                return {...item,completed:!item.completed}
            }
            return item;
        }))
    }
    
    return(
        <li className={`todo ${todo.completed?"complete":""}`}>
            <div className={`todo-text ${todo.completed?"completed":""}`}>{todo.text}</div>
            <button className="done-btn" onClick={completeHandler}>Done</button>
            <button className="del-btn" onClick={deleteHandler}>Delete</button>
        </li>
    )
}