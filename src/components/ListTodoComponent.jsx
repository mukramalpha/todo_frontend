import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import {useNavigate} from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ListTodoComponent = () => {

// const dummyData=[
//     {
//         "id":1,
//         "title":"Learn English",
//         "description":"Should be study english daily",
//         "completed":false
//     },
//     {
//         "id":2,
//         "title":"Learn ReactJs",
//         "description":"should be strong first in Html,Css and JS",
//         "completed":false
//     },
//     {
//         "id":3,
//         "title":"Learn Java",
//         "description":"Should be learn Java with examples",
//         "completed":false
//     }
// ]
  // const [todos,setTodos]=useState(dummyData)
  const [todos,setTodos]=useState([])
  const navigate=useNavigate()
  
  const isAdmin=isAdminUser();

  useEffect(()=>{
        listTodos();
  },[])
   
  function listTodos(){
     getAllTodos().then((response)=>{
        setTodos(response.data);
     }).catch(error=>{
        console.error(error);
     })
  }

  function addNewTodo(){
       navigate('/add-todo');
  }

  function updateTodo(id){
    console.log(id);
    navigate(`/update-todo/${id}`);

  }

  function removeTodo(id){
    deleteTodo(id).then((response)=>{
      console.log(response.data);
      listTodos();
    }).catch(error=>{
      console.error(error);
    })
  }

function  markCompleteTodo(id){
   completeTodo(id).then((response)=>{
      listTodos();
   }).catch(error=>{
      console.error(error);
   })
}

function markInCompleteTodo(id){
  inCompleteTodo(id).then((response)=>{
    listTodos();
  }).catch(error=>{
    console.error(error);
  })
}

  return (
    <div className='container'>
        <h1 className='text-center text-primary'>List of Todos</h1>
        <button className='btn btn-success mb-2' onClick={addNewTodo}>Add Todo</button>
        <table className='table table-bordered table-striped table-hover text-center'>
          <thead className='table-dark'>
            <tr>
                <th>#</th>
                <th>Todo Title</th>
                <th>Todo Description</th>
                <th>Todo Completed</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                todos.map(todo=>
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.completed?'YES':'NO'}</td>
                      <td>
                        {
                          isAdmin &&
                          <button className='btn btn-warning' onClick={()=>updateTodo(todo.id)}>Update</button>
                        }
                        {
                          isAdmin &&
                          <button className='btn btn-danger' onClick={()=>removeTodo(todo.id)} style={{marginLeft:'10px'}}>Delete</button>
                        }
                        
                        
                        <button className='btn btn-success' onClick={()=>markCompleteTodo(todo.id)} style={{marginLeft:'10px'}}>Comlete</button>
                        <button className='btn btn-info' onClick={()=>markInCompleteTodo(todo.id)} style={{marginLeft:'10px'}}>Incomlete</button>
                      </td>
                    </tr>
                    )
            }
            
          </tbody>
        </table>

    </div>
  )
}

export default ListTodoComponent