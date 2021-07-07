import { API_ROOT } from '../config/global';
import axios from 'axios';

export async function register(dispatch, registerPayload) {
    const body = registerPayload;
    try {
        dispatch({ type: 'REGISTER_INIT' });
        let response = await axios.post(`${API_ROOT}user/`, body);
        let data = response.data;
        if (response.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
            return data
        }

    } catch (e) {
        console.log(e);
        dispatch({ type: 'REGISTER_FAILURE' })
    }
}