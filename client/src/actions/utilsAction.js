import {
    FETCH_SEARCH,
    SEARCH_RESULT,
    SEARCH_FAIL,
    FETCH_CONTACT_US,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from "./index";

import { toast } from "react-toastify";
import axios from "axios";
import { searchKeyword, contactUs } from "../constant/routes";

export const getSearchData = (keyword) => async (dispatch) => {
    dispatch({
        type: FETCH_SEARCH,
    });
    // get all search result
    const searchData = await axios.get(searchKeyword + keyword)
        .then(res => res)
        .catch(error => error.response.data.error);

    if (searchData.status === 200) {
        dispatch({
            type: SEARCH_RESULT,
            payload: searchData.data,
        });
    } else {
        dispatch({
            type: SEARCH_FAIL,
            payload: 'search failed',
        });
    };
}

export const sendMessageContact = (object) => async (dispatch) => {
    dispatch({
        type: FETCH_CONTACT_US,
    });
    // login request
    const loginConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // send message
    const contactData = await axios.post(contactUs, object, loginConfig)
        .then(res => res)
        .catch(error => error.response.data.error);

    if (contactData.status === 200) {
        dispatch({
            type: CONTACT_US_SUCCESS,
        });
        toast.success(contactData.data.msg)
    } else {
        dispatch({
            type: CONTACT_US_FAIL,
            payload: 'Message not sent, Something went wrong !',
        });
        toast.error('Message not sent, Something went wrong !');
    };
}