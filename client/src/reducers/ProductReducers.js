import {
    PRODUCTS_REQUEST,
    PRODUCTS_REQUEST_SUCCESS,
    PRODUCTS_REQUEST_FAIL
} from '../actions/index'

const initialState = {
    loading: false,
    products: null
}

export const getallProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case PRODUCTS_REQUEST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case PRODUCTS_REQUEST_FAIL:
            return { ...state, loading: false, products: null, error: action.payload };
        default:
            return state;
    }
}