import React, { useEffect, useState } from 'react'
import { getTodo, saveTodo, updateTodo } from '../services/TodoService'
import {useNavigate,useParams} from 'react-router-dom'

const TodoComponent = () => {

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [completed,setCompleted]=useState(false)

    const navigate=useNavigate()

    const {id}=useParams()

    function saveOrUpdateTodo(e){
        e.preventDefault()
        
        const todo={title,description,completed}
        console.log(todo);
        
        if(id){
            updateTodo(id,todo).then((response)=>{
                console.log(response.data);
                navigate('/todos');
            }).catch(error=>{
                console.error(error);
            })
        }else{
            saveTodo(todo).then((response)=>{
                console.log(response.data);
                navigate('/todos');
            }).catch(error=>{
                console.error(error);
            })

        }

        
    }

    function pageTitle(){
        if(id){
            return <h1 className='text-center'>Update Todo</h1>
        }else{
            return <h1 className='text-center'>Add Todo</h1>
        }
    }

    useEffect(()=>{
        if(id){
            getTodo(id).then((response)=>{
                console.log(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCompleted(response.data.completed);

            }).catch(error=>{
                console.error(error);
            })
        }

    },[id])
  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-md-6 offset-md-3 offset-md-3'>
        <div className='card bg-light'>
          <div className='card-header text-white bg-info'>
           {
            pageTitle()
           }
          </div>
          <div className='card-body'>
            <form>
                <div className='form-group mb-3'>
                    <label className='form-label'>Todo Title:</label><br/>
                    <input 
                      type='text'
                      className='form-control'
                      name='title'
                      value={title}
                      placeholder='Enter Todo Title'
                      onChange={(e)=>setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Todo Description:</label><br/>
                    <input 
                      type='text'
                      className='form-control'
                      name='description'
                      value={description}
                      placeholder='Enter Todo Description'
                      onChange={(e)=>setDescription(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Todo Completed:</label><br/>
                    <select
                      className='form-control'
                      value={completed}
                      onChange={(e)=>setCompleted(e.target.value)}
                    >
                       <option value='false'>NO</option>
                       <option value='true'>YES</option>
                    </select>
                </div>
                <br/><br/>
                <button className='btn btn-info text-white'onClick={(e)=>saveOrUpdateTodo(e)}>Submit</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default TodoComponent