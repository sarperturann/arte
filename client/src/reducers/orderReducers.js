import {
    FETCH_PLACE_ORDER,
    PLACE_ORDER_FAIL,
    FETCH_GET_ORDERS,
    GET_ORDERS_RESPONSE,
    GET_ORDERS_FAIL,
    FETCH_DELETE_ORDER,
    // DELETE_ORDER_RESPONSE,
    DELETE_ORDER_FAIL
} from '../actions/index'

const initialState = {
    loading: false,
    orders: [],
    error: null
}

export const getallOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GET_ORDERS:
            return { ...state, loading: true };
        case GET_ORDERS_RESPONSE:
            return { ...state, loading: false, orders: action.payload, error: null };
        case GET_ORDERS_FAIL:
            return { ...state, loading: false, orders: null, error: action.payload };
        case FETCH_PLACE_ORDER:
            return { ...state, loading: true };
        case PLACE_ORDER_FAIL:
            return { ...state, loading: false, orders: null, error: action.payload };
        case FETCH_DELETE_ORDER:
            return { ...state, loading: true };
        case DELETE_ORDER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}