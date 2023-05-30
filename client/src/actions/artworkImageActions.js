import {
    PRODUCTS_REQUEST,
    PRODUCTS_REQUEST_SUCCESS,
    PRODUCTS_REQUEST_FAIL
} from './index'
import axios from 'axios'
import { getAllArtworkImages } from '../constant/routes'

export const getArtworkImages = () => async (dispatch) => {
    dispatch({
        type: PRODUCTS_REQUEST,
    });
    // get all product request
    const productsData = await axios.get(getAllArtworkImages, {
        headers: {
          'Access-Control-Allow-Origin': '*' // or specify a specific origin
        }
      })
    .then(res => res)
    .catch(error => error.response.data.error);

    if(productsData.status === 200){
        dispatch({
            type : PRODUCTS_REQUEST_SUCCESS,
            payload: productsData.data,
        });
    } else {
        dispatch({
            type: PRODUCTS_REQUEST_FAIL,
            payload: productsData.data,
        });
    };
}