import { API_ROOT } from '../config/global';
import axios from 'axios';



export async function fetchData(dispatch, currentPage, following, user) {
    dispatch({ type: 'POSTS_FETCH_INIT' });
    let path = ""
    let param = ""
    let paramValue = ""
    try {
        if (following) {
            path = "following/"
        } 
        if (user) {
            param="user"
            paramValue = user
        }
        const data = await axios.get(`${API_ROOT}post/${path}?${param}=${paramValue}&page=${currentPage}`);
        const result = data.data;

        dispatch({
            type: 'POSTS_FETCH_SUCCESS',
            payload: {
                posts: result.results,
                nextPage: result.next,
                previousPage: result.previous,
            },
        });
    } catch {
        dispatch({
            type: 'POSTS_FETCH_FAILURE'
        });
    }
}