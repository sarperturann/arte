import { ARTWORK_REQUEST, ARTWORK_REQUEST_FAIL, ARTWORK_REQUEST_SUCCESS } from '../actions/index'

const initialState = {
    loading: false,
    products: null
}

export const getArtworkImagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTWORK_REQUEST:
            return { ...state, loading: true };
        case ARTWORK_REQUEST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };
        case ARTWORK_REQUEST_FAIL:
            return { ...state, loading: false, products: null, error: action.payload };
        default:
            return state;
    }
}