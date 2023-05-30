import {
    ARTWORKDETAIL_REQUEST_SUCCESS,
    ARTWORKDETAIL_REQUEST_FAIL,
    ARTWORKDETAIL_REQUEST
} from './index'
import axios from 'axios'
import { getallartworks } from '../constant/routes'

export const getArtwork = () => async (dispatch) => {
    dispatch({
        type: ARTWORKDETAIL_REQUEST,
    });
    // get all product request
    const productsData = await axios.get(getallartworks, {
        headers: {
          'Access-Control-Allow-Origin': '*' // or specify a specific origin
        }
      })
    .then(res => res)
    .catch(error => error.response.data.error);

    if(productsData.status === 200){
        dispatch({
            type : ARTWORKDETAIL_REQUEST_SUCCESS,
            payload: productsData.data,
        });
    } else {
        dispatch({
            type: ARTWORKDETAIL_REQUEST_FAIL,
            payload: productsData.data,
        });
    };
}