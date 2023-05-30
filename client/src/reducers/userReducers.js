import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_DATA_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL
} from '../actions/index'

const userState = {
    loading: false,
    authtokken: null,
    userInfo: {}
}

export const userLoginReducer = (state = userState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, authtokken: action.payload, error: null };
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, authtokken: null, userInfo: {}, error: action.payload };
        case USER_DATA_REQUEST:
            return { ...state, loading: true };
        case USER_DETAIL_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case USER_DETAIL_FAIL:
            return { ...state, loading: false, userInfo: {}, error: action.payload };
        case USER_LOGOUT:
            return { ...state, authtokken: null, userInfo: {} };
        default:
            return state;
    }
}

export const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, user: true, error: null };
        case USER_SIGNUP_FAIL:
            return { loading: false, user: false, error: action.payload };
        default:
            return state;
    }
}