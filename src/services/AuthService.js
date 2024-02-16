import axios from "axios";
 
const AUTH_REST_API_BASE_URL='http://localhost:9999/api/auth';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
     config.headers['Authorization']=getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export const registerCallApi=(registerObj)=>{
    return axios.post(AUTH_REST_API_BASE_URL+'/register',registerObj);
}

export const loginCallApi=(usernameOrEmail,password)=>{
    return axios.post(AUTH_REST_API_BASE_URL+'/login',{usernameOrEmail,password});
}

export const storeToken=(token)=>{
    return localStorage.setItem("token",token);
}

export const getToken=()=>{
    return localStorage.getItem("token");
}

export const saveLoggedInUser=(username,role)=>{
    sessionStorage.setItem("authenticatedUser",username);
    sessionStorage.setItem("role",role);
}

export const isUserLoggedIn=()=>{
   const username=sessionStorage.getItem("authenticatedUser");
   if(username==null){
    return false;
   }else{
    return true;
   }
}

export const getLoggedInUser=()=>{
    const username=sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser=()=>{
    let role=sessionStorage.getItem("role");
    if(role!=null && role==='ROLE_ADMIN')
    {
        return true;
    }else{
        return false;
    }
}