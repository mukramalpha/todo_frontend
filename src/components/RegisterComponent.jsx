import React, { useState } from 'react'
import { registerCallApi } from '../services/AuthService'

const RegisterComponent = () => {

    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    function handleRegistrationForm(e){
        e.preventDefault();
        const register={name,username,email,password}
        console.log(register);

        registerCallApi(register).then((response)=>{
            console.log(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }
  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-md-6 offset-md-3'>
            <div className='card'>
                <div className='card-header bg-primary'>
                   <h2 className='text-center text-white'>User Register Form</h2>
                </div>
                <div className='card-body'>
                   <form>
                    <div className='row mb-3'>
                        
                            <label className='col-md-3 control-label'>Name</label>
                            <div className='col-md-9'>
                                <input type='text'
                                       name='name'
                                       value={name}
                                       placeholder='Enter name'
                                       className='form-control'
                                       onChange={(e)=>setName(e.target.value)}
                                       />
                            </div>
                    </div>
                    <div className='row mb-3'>
                        
                            <label className='col-md-3 control-label'>Username</label>
                            <div className='col-md-9'>
                                <input type='text'
                                       name='username'
                                       value={username}
                                       placeholder='Enter username'
                                       className='form-control'
                                       onChange={(e)=>setUsername(e.target.value)}
                                       />
                            </div>
                    </div>
                    <div className='row mb-3'>
                        
                        <label className='col-md-3 control-label'>Email</label>
                        <div className='col-md-9'>
                            <input type='text'
                                   name='email'
                                   value={email}
                                   placeholder='Enter email'
                                   className='form-control'
                                   onChange={(e)=>setEmail(e.target.value)}
                                   />
                        </div>
                </div>
                <div className='row mb-3'>
                        
                        <label className='col-md-3 control-label'>Password</label>
                        <div className='col-md-9'>
                            <input type='password'
                                   name='password'
                                   value={password}
                                   placeholder='Enter password'
                                   className='form-control'
                                   onChange={(e)=>setPassword(e.target.value)}
                                   />
                        </div>
                </div>
                    <div className='form-group mb-3'>
                        <button className='btn btn-primary' onClick={(e)=>handleRegistrationForm(e)}>Submit</button>
                    </div>
                   </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent