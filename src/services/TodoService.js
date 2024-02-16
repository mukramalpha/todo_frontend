import axios from 'axios'

const BASE_REST_API_URL='http://localhost:9999/api/todos';

export const getAllTodos=()=>{
    return axios.get(BASE_REST_API_URL);
}
export const saveTodo=(todo)=>{
    return axios.post(BASE_REST_API_URL,todo);
}
export const getTodo=(id)=>{
    return axios.get(BASE_REST_API_URL+'/'+id);
}
export const updateTodo=(id,todo)=>{
    return axios.put(BASE_REST_API_URL+'/'+id,todo);
}
export const deleteTodo=(id)=>{
    return axios.delete(BASE_REST_API_URL+'/'+id);
}
export const completeTodo=(id)=>{
    return axios.patch(BASE_REST_API_URL+'/'+id+'/complete');
}
export const inCompleteTodo=(id)=>{
    return axios.patch(BASE_REST_API_URL+'/'+id+'/in-complete');
}