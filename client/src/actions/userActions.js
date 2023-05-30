import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_DATA_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
} from "./index";
import axios from "axios";
import { toast } from "react-toastify";
import { login, getuser, signup, addcart, updateuser } from "../constant/routes";
import Cookies from "universal-cookie";
import { getCartbyUser } from "./cartAction";

// user login
export const userLogin = (email, password) => async (dispatch) => {
  const cookies = new Cookies();
  // initialise login process
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  // login request
  const loginConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .post(
      login,
      {
        email,
        password,
      },
      loginConfig
    )
    .then((res) => res.data)
    .catch((error) => error.response.data.error);

  if (response.success === true) {
    // store tokken
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.authtokken,
    });

    // storing auth tokken in cookies
    cookies.set("tkn", response.authtokken);

    // detail request
    const getuserConfig = {
      headers: {
        "auth-token": response.authtokken,
        "Content-Type": "application/json",
      },
    };
    const user = await axios
      .get(getuser, getuserConfig)
      .then((res) => res.data)
      .catch((error) => error.response.data.error);

    if (user._id) {
      // store user info
      dispatch({
        type: USER_DETAIL_SUCCESS,
        payload: {
          // id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          secondaryPhoneNumber: user.secondaryPhoneNumber,
          address: user.address,
          house_flat_no: user.house_flat_no,
          city: user.city,
          state: user.state,
          landmark: user.landmark,
          pincode: user.pincode
        },
      });

      // storing user id in cookies
      cookies.set("ui", user._id);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      axios.post(
        addcart,
        {
          cart: [],
          userId: user._id,
        },
        getuserConfig
      );
      dispatch(getCartbyUser("getCartbyUser"))
      toast.success(`Welcome ${user.name}`);
    } else {
      dispatch({
        type: USER_DETAIL_FAIL,
        payload: user,
      });
      toast.error(user);
    }
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: response,
    });
    toast.error(response);
  }
};

// get user info
export const getUserInfo = () => async (dispatch) => {
  const cookies = new Cookies();
  let authtokken = cookies.get('tkn')
  const getuserConfig = {
    headers: {
      "auth-token": authtokken,
      "Content-Type": "application/json",
    },
  };
  const user = await axios
    .get(getuser, getuserConfig)
    .then((res) => res.data)
    .catch((error) => error.response.data.error);

  if (user._id) {
    // store user info
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: {
        // id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        secondaryPhoneNumber: user.secondaryPhoneNumber,
        address: user.address,
        house_flat_no: user.house_flat_no,
        city: user.city,
        state: user.state,
        landmark: user.landmark,
        pincode: user.pincode
      },
    });
  }
}

// user sign Up
export const userSignup = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
  });

  // signUp request config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // sending request
  const response = await axios
    .post(signup, userInfo, config)
    .then((res) => res)
    .catch((error) => error.response);

  if (response.status === 200) {
    // store user info
    dispatch({
      type: USER_SIGNUP_SUCCESS,
    });
    toast.success("Account created.");
  } else {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: response.data.error,
    });
    toast.error(response);
  }
};

// user Logout
export const userLogout = () => (dispatch) => {
  const cookies = new Cookies();
  dispatch({
    type: USER_LOGOUT,
  });
  cookies.remove("tkn");
  cookies.remove("ui");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  toast.success("Logged out !");
};

// user update
export const userUpdateInfo = (data) => async(dispatch) => {
  // fetching user data
  dispatch({
    type: USER_DATA_REQUEST,
  });

  const cookies = new Cookies();
  let authtokken = cookies.get('tkn')
  let userId = cookies.get('ui')
  const getuserConfig = {
    headers: {
      "auth-token": authtokken,
      "Content-Type": "application/json",
    },
  };
  let url = `${updateuser}${userId}`
  const user = await axios
    .put(url, data, getuserConfig)
    .then((res) => {
      toast.success('Profile Updated !');
      return res.data
    })
    .catch((error) => {
      toast.error('Profile Updated !');
      return error.response.data.error
    });
    
  if (user._id) {
    // store user info
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        secondaryPhoneNumber: user.secondaryPhoneNumber,
        address: user.address,
        house_flat_no: user.house_flat_no,
        city: user.city,
        state: user.state,
        landmark: user.landmark,
        pincode: user.pincode
      },
    });
  }
};
