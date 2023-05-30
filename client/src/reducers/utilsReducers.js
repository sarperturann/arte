import {
    FETCH_SEARCH,
    SEARCH_RESULT,
    SEARCH_FAIL,
    FETCH_CONTACT_US,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from "../actions/index";

const initialState = {
    searchResult : {
        loading: true,
        results: null,
        error: null
    },
    sendMessage : {
        loading: false,
        error: null
    }
}

export const getSearchResult = (state = initialState.searchResult, action) => {
    switch (action.type) {
        case FETCH_SEARCH:
            return { ...state, loading: true };
        case SEARCH_RESULT:
            return { ...state, loading: false, results: action.payload, error: null };
        case SEARCH_FAIL:
            return { ...state, loading: false, results: null, error: action.payload };
        default:
            return state;
    }
}

export const sendMessageResult = (state = initialState.sendMessage, action) => {
    switch (action.type) {
        case FETCH_CONTACT_US:
            return { ...state, loading: true };
        case CONTACT_US_SUCCESS:
            return { ...state, loading: false, error: null };
        case CONTACT_US_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}