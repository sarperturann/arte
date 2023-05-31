import {
  ADD_TO_CART,
  FETCH_CART,
  GET_CART_BY_ID,
  GET_ARTWORK_BY_ID,
  CLEAN_CART,
  MODIFY_CART,
} from "./index";
import { toast } from "react-toastify";
import axios from "axios";
import { getCartbyIdBiz, updatecart, removeProduct, getArtworkByIdBiz} from "../constant/routes";
import Cookies from "universal-cookie";

const update = async (list) => {
  const cookies = new Cookies();
  let userId = await cookies.get("ui");
  let token = await cookies.get("tkn");
  let config = {
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
  };
  axios
    .put(updatecart + userId, { cart: [...list] }, config)
    .catch((err) => console.error("Something went wrong !"));
};

export const cart = (action, list) => async (dispatch) => {
  if (action === "add") {
    dispatch({
      type: ADD_TO_CART,
      payload: [...list],
    });
    update(list)
    toast.success(`Product Added`);
  } else {
    console.log("Please enter a valid action");
  }
};

export const modifyCart = (cart) => async (dispatch) => {
  dispatch({
    type: MODIFY_CART,
    cart: [...cart],
  });
};

export const updateCart = (list) => async (dispatch) => {
  update(list);
  toast.success(`Cart Updated`);
};

export const deleteProduct = (productId) => async (dispatch) => {
  const cookies = new Cookies();
  let userId = await cookies.get("ui");
  let token = await cookies.get("tkn");
  let config = {
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
  };
  axios
    .delete(removeProduct + `${userId}/${productId}`, config)
    .then(res => {
      toast.success("Item Removed")
    })
    .catch((err) => console.error("Something went wrong !"));
};

export const getCartbyUser = (action) => async (dispatch) => {
  if (action === "getCartbyUser") {
  
    dispatch({
      type: FETCH_CART,
      payload: [],
    });
    const cookies = new Cookies();
    let userId = await cookies.get("ui");
    let token = await cookies.get("tkn");
    let config = {
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    };

      axios
        .get(getCartbyIdBiz + "2")
        .then((res) => {
          if (res.status === 200) {

            console.log("ggetting the cart" + res.data)
            dispatch({
              type: GET_CART_BY_ID,
              payload: res.data,
            });
          }
        })
        .catch((err) => console.error(err));
 
  }
};

export const getCartbyId = (action) => async (dispatch) => {
  if (action === "getCartbyId") {
    dispatch({
      type: FETCH_CART,
      payload: [],
    });


  }

  
};

export const getArtworkbyId = (artworkId) => async (dispatch) => {
  axios
    .get(getArtworkByIdBiz + artworkId)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_ARTWORK_BY_ID, // Note: You'll need to handle this action in your reducer
          payload: { artworkId, artwork: res.data },
        });
      }
    })
    .catch((err) => console.error(err));
};

export const cleanCart = () => async (dispatch) => {
  dispatch({
    type: CLEAN_CART,
    payload: [],
  });
};
