import {
    BLOGS_REQUEST,
    BLOGS_REQUEST_SUCCESS,
    BLOGS_REQUEST_FAIL
} from './index'
import axios from 'axios'
import { getallblogs } from '../constant/routes'

export const getallBlogs = () => async (dispatch) => {
    dispatch({
        type: BLOGS_REQUEST,
    });
    // get all blogs request
    const blogData = await axios.get(getallblogs)
    .then(res => res)
    .catch(error => error.response.data.error);

    if(blogData.status === 200){
        dispatch({
            type : BLOGS_REQUEST_SUCCESS,
            payload: blogData.data.reverse(),
        });
    } else {
        dispatch({
            type: BLOGS_REQUEST_FAIL,
            payload: blogData.data,
        });
    };
}