import {
    FETCH_PLACE_ORDER,
    PLACE_ORDER_FAIL,
    FETCH_GET_ORDERS,
    GET_ORDERS_RESPONSE,
    GET_ORDERS_FAIL,
    FETCH_DELETE_ORDER,
    DELETE_ORDER_FAIL
} from './index'
import axios from 'axios'
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { placeorder, getorders, cancelorder, updatecart } from '../constant/routes'

const cleanCart = async () => {
    const cookies = new Cookies();
    let userId = await cookies.get("ui");
    let token = await cookies.get("tkn");
    let config = {
        headers: {
            "auth-token": token,
            "Content-Type": "application/json",
        },
    };
    axios
        .put(updatecart + userId, { cart: [] }, config)
        .catch((err) => console.error("Something went wrong !"));
};

// get all orders
export const getallOrders = () => async (dispatch) => {
    dispatch({
        type: FETCH_GET_ORDERS,
    });
    const cookies = new Cookies();
    let ui = cookies.get("ui");
    let token = cookies.get("tkn");
    let config = {
        headers: {
            "auth-token": token,
            "Content-Type": "application/json",
        },
    };
    // get all Orders request
    const orderData = await axios.get(getorders + ui, config)
        .then(res => res)
        .catch(error => error.response.data.error);

    if (orderData.status === 200) {
        dispatch({
            type: GET_ORDERS_RESPONSE,
            payload: orderData.data,
        });
    } else {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: "Something went wrong.",
        });
        toast.error(`Something went wrong !`);
    };
}

// place order
export const placeUserOrders = (data, navigate) => async (dispatch) => {
    dispatch({
        type: FETCH_PLACE_ORDER,
    });
    const cookies = new Cookies();
    let token = cookies.get("tkn");
    let config = {
        headers: {
            "auth-token": token,
            "Content-Type": "application/json",
        },
    };
    // get all Orders request
    const orderData = await axios.post(placeorder, data, config)
        .then(res => res)
        .catch(error => error.response.data.error);

    if (orderData.status === 200) {
        toast.success(`Order Placed !`);
        cleanCart();
        navigate('/myorders');
    } else {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: "Something went wrong.",
        });
        toast.error(`Something went wrong !`);
    };
}

export const cancleUserOrder = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_DELETE_ORDER,
    });
    const cookies = new Cookies();
    let token = cookies.get("tkn");
    let config = {
        headers: {
            "auth-token": token,
            "Content-Type": "application/json",
        },
    };
    // get all Orders request
    const orderData = await axios.delete(cancelorder + id, config)
        .then(res => res)
        .catch(error => error.response.data.error);

    if (orderData.status === 200) {
        toast.success(`Order Canceled !`);
        dispatch(getallOrders());
    } else {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: "Unable to delete order.",
        });
        toast.error(`Something went wrong !`);
    };
}