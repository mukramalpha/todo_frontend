import React, { useState } from 'react'
import { loginCallApi, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const navigator=useNavigate();

    async function handleLoginForm(e){
        e.preventDefault();
        const loginObject={username,password};
        console.log(loginObject);

      await  loginCallApi(username,password).then((response)=>{
            console.log(response.data);

            //const token='Basic '+window.btoa(username+':'+password);
            const token='Bearer '+response.data.accessToken;
            const role=response.data.role;
            storeToken(token);

            saveLoggedInUser(username,role);
            navigator("/todos");
            window.location.reload(false);
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
                   <h2 className='text-center text-white'>User Login Form</h2>
                </div>
                <div className='card-body'>
                   <form>
                    
                    <div className='row mb-3'>
                        
                            <label className='col-md-3 control-label'>Username or Email</label>
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
                        <button className='btn btn-primary' onClick={(e)=>handleLoginForm(e)}>Submit</button>
                    </div>
                   </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent