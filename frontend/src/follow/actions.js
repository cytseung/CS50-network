import { API_ROOT } from '../config/global';
import axios from 'axios';

export async function toggle_follow(dispatch, followPayload, username) {
    const body = followPayload;
    try {
        let response = await axios.put(`${API_ROOT}user/${username}/toggle_follow_user/`, body);
        let data = response.data;
        if (data.status === `following user ${username}`) {
            dispatch({ type: 'FOLLOWED' });
        }else if (data.status === `unfollowed user ${username}`){
            dispatch({type: 'UNFOLLOWED'})
        }else{
            throw new Error();
        }
        return response;

    } catch (e) {
        console.log(e);
        dispatch({ type: 'REGISTER_FAILURE' })
    }
}