import {
    BLOGS_REQUEST,
    BLOGS_REQUEST_SUCCESS,
    BLOGS_REQUEST_FAIL
} from '../actions/index'

const initialState = {
    loading: false,
    blogs: null
}

export const getallBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BLOGS_REQUEST:
            return { ...state, loading: true };
        case BLOGS_REQUEST_SUCCESS:
            return { ...state, loading: false, blogs: action.payload, error: null };
        case BLOGS_REQUEST_FAIL:
            return { ...state, loading: false, blogs: null, error: action.payload };
        default:
            return state;
    }
}