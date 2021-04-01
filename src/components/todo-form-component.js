import React,{useState,useEffect} from "react";
import TodoList from "./todo-list-component";
import Header from "./header-component";

export default function TodoForm(){
    const[inputText,setInputText]=useState('');
    const[todolist,setTodoList]=useState([]);
    const[status,setStatus]=useState("all");
    const[filteredTodos,setFilteredTodos]=useState([]);
    
    useEffect(()=>{
        getLocalStorage();
    },[])

    useEffect(()=>{
        filterHandler();
        saveLocalStorage();
    },[status,todolist])

    
    //save to local storage
    const saveLocalStorage=()=>{
        localStorage.setItem('todos',JSON.stringify(todolist));
    }
    //get stored data from local storage
    const getLocalStorage=()=>{
        if(localStorage.getItem('todos')===null){
            localStorage.setItem('todos',JSON.stringify([]));
        }else{
            const storedTodos=JSON.parse(localStorage.getItem('todos'));
            setTodoList(storedTodos);
        }
    }

    const inputHandler=(e)=>{
        setInputText(e.target.value)
    }
    const submitHandler=()=>{
        if(inputText!==''){
            setTodoList([...todolist,{id:Math.random()*100000,text:inputText,completed:false}]);
            setInputText('')
        }
    }

    const statusHandler=(e)=>{
        setStatus(e.target.value);
    }
    //handles the filtering of todos
    const filterHandler=()=>{
        if(status==="completed"){
            setFilteredTodos(todolist.filter((todo)=>todo.completed===true));
        }
        else if(status==="uncompleted"){ 
            setFilteredTodos(todolist.filter((todo)=>todo.completed===false));
        }else{
            setFilteredTodos(todolist);
        }
       
    }
   
    return(
        <>
            <Header/>
            <div className="main-container">
                <form onSubmit={(e)=>e.preventDefault()} className="todo-form" >
                    <input type="text" value={inputText} onChange={inputHandler} placeholder="Enter Your Text Here" required/>
                    <button className="add-btn" type="button" onClick={submitHandler}>+</button>
                </form>
                
                <select value={status} onChange={statusHandler} className="filter">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
                
            </div>
            <TodoList todoList={todolist} setTodoList={setTodoList} filteredTodos={filteredTodos}/>
        </>
    )
}