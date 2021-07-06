import { API_ROOT } from '../config/global';
import axios from 'axios';

export async function loginUser(dispatch, loginPayload) {

    const headers = { 'Content-Type': 'application/json' };
    const body = loginPayload;

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await axios.post(`${API_ROOT}token/`, body)
        let data = response.data;
        

        if (data.user_id) {
            dispatch({type: 'LOGIN_SUCCESS', payload: data});
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }
        let errorMessages = []
        data.forEach((k,v)=>{
            errorMessages.push(v)
        })
        dispatch({type: 'LOGIN_ERROR', error:errorMessages});
        return;
    }catch(error){
        let errorMessages = []
        let data = error.response.data
        for (var key in data){
            // console.log(data[key][0])
            errorMessages.push(data[key][0])
        }
        // console.log(errorMessages)
        dispatch({type: 'LOGIN_ERROR', error:errorMessages});
    }
}
    
export async function logout(dispatch){
    try{
    dispatch({type:'LOGOUT'});
    let response = await axios.post(`${API_ROOT}logout/`)
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    }catch(error){
        console.log(error);
    }
}