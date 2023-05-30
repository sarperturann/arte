import {
  ADD_TO_CART,
  FETCH_CART,
  GET_CART_BY_ID,
  CLEAN_CART,
  MODIFY_CART
} from "../actions/index";

export const initialState = {
  fetching : false,
  cart : [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART:
            return { ...state, fetching: true, cart : action.payload};
        case GET_CART_BY_ID:
            return { ...state, fetching: false, cart : action.payload };
        case ADD_TO_CART:
            return { ...state, cart : action.payload };
        case MODIFY_CART:
            return { ...state, cart : action.cart };
        case CLEAN_CART:
            return { ...state, cart : action.payload };
        // case BLOGS_REQUEST_SUCCESS:
        //     return { ...state, loading: false, blogs: action.payload, error: null };
        // case BLOGS_REQUEST_FAIL:
        //     return { ...state, loading: false, blogs: null, error: action.payload };
        default:
            return state;
    }
}