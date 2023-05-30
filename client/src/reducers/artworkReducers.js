import { ARTWORKDETAIL_REQUEST, ARTWORKDETAIL_REQUEST_FAIL, ARTWORKDETAIL_REQUEST_SUCCESS } from '../actions/index'

const initialState = {
    loading: false,
    products: null
}

export const getArtworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTWORKDETAIL_REQUEST:
            return { ...state, loading: true };
        case ARTWORKDETAIL_REQUEST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case ARTWORKDETAIL_REQUEST_FAIL:
            return { ...state, loading: false, products: null, error: action.payload };
        default:
            return state;
    }
}