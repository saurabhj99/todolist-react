import React from "react";
import Todo from "./todo-component";
export default function TodoList({todoList,setTodoList,filteredTodos}){
    return(
        <ul type="none" className="todo-container">
           {filteredTodos.map((todo)=>
                <Todo key={todo.id} 
                    todo={todo}
                    todolist={todoList}
                    setTodoList={setTodoList}/>
            )}
        </ul>
    )
} 