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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const userLogin = (email, password) => async (dispatch) => {
  const cookies = new Cookies();
  // initialise login process
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // store token
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userCredential.user.getIdToken(),
    });

    // storing auth token in cookies
    cookies.set("tkn", userCredential.user.getIdToken());

    // detail request
    const user = userCredential.user;

    if (user.uid) {
      // store user info
      dispatch({
        type: USER_DETAIL_SUCCESS,
        payload: {
          name: user.displayName,
          email: user.email,
          createdId: user.metadata.createdAt
          // Add other user details as needed
        },
      });

      // storing user id in cookies
      cookies.set("ui", user.uid);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("createdId", user.metadata.createdAt);

      dispatch(getCartbyUser("getCartbyUser"))
      console.log("hophop")
      console.log(localStorage)
    //  toast.success(`Welcome ${user.displayName}`);
    } else {
      dispatch({
        type: USER_DETAIL_FAIL,
        payload: "Failed to retrieve user details",
      });
      toast.error("Failed to retrieve user details");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
    toast.error(error.message);
    console.log(error);
  }
};


/** 

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
*/

// user sign Up
export const userSignup = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
  });

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
   /* const cartData = {
      userId: userCredential.user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      artworks: [],
    };
    const createdCart = await axios.post(createCart, cartData);
    console.log('Cart created:', createdCart.data);
*/
    // store user info
    dispatch({
      type: USER_SIGNUP_SUCCESS,
    });
    toast.success("Account created.");
    console.log(userCredential);
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.message,
    });
    toast.error(error.message);
    console.log(error);
  }
};

// user Logout

export const userLogout = () => (dispatch) => {
  const cookies = new Cookies();
  signOut(auth)
    .then(() => {
      dispatch({
        type: USER_LOGOUT,
      });
      cookies.remove("tkn");
  cookies.remove("ui");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  toast.success("Logged out !");
      console.log("sign out successful");
    })
    .catch((error) => console.log(error));
};

// user update
/** 
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
*/