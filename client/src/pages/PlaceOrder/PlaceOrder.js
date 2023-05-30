import React, { useEffect, useState } from "react";
import "./placeOrder.css";
import { TiUser } from "react-icons/ti";
import {
  HiOutlineMail,
  HiOutlineCash,
  HiOutlineReceiptTax,
  HiCash,
} from "react-icons/hi";
import { BiPhone, BiMapPin, BiMessageSquareEdit } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { getUserInfo } from "../../actions/userActions";
import { getCartbyUser } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "../../components";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { placeUserOrders } from "../../actions/orderActions";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const userState = useSelector((state) => state.userLogin);
  const userCart = useSelector((state) => state.cart);
  const cookies = new Cookies();
  let tkn = cookies.get("tkn");

  const calculateTotal = () => {
    let value = 0;
    for (let i = 0; i < userCart.cart.length; i++) {
      value =
        value + userCart.cart[i].productPrice * userCart.cart[i].quanitity;
    }
    setTotalAmount(value);
  };

  const placeorderHandler = () => {
    if (userCart.cart.length > 0) {
      let id = cookies.get("ui");
      let data = {
        items: userCart.cart,
        paymentMethod: "Cash on Deleivery",
        userInfo: {
          userName: userState.userInfo.name,
          userEmail: userState.userInfo.email,
          phone: {
            phoneNumber: userState.userInfo.phoneNumber,
            secondaryPhoneNumber: userState.userInfo.secondaryPhoneNumber,
          },
          address: {
            city: userState.userInfo.city,
            state: userState.userInfo.state,
            landmark: userState.userInfo.landmark,
            house_flat_no: userState.userInfo.house_flat_no,
            pincode: userState.userInfo.pincode,
            address: userState.userInfo.address,
          },
        },
        userId: id,
      };
      dispatch(placeUserOrders(data, navigate));
    } else {
      toast.error("You Don't have any item in your cart");
    }
  };

  useEffect(() => {
    if (userState.userInfo.name === undefined) {
      dispatch(getUserInfo());
    }
    calculateTotal();
  }, [userState, userCart]); // eslint-disable-line

  useEffect(() => {
    if (tkn !== undefined) {
      dispatch(getCartbyUser("getCartbyUser"));
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    window.scrollTo(0, 0);
  }); // eslint-disable-line

  return (
    <>
      {userState.userInfo.name !== undefined && userCart.fetching !== true ? (
        <div className="placeOrderPage">
          <div className="placeOrderPageInfo">
            {/* user Items */}
            <div className="userItems">
              <h1>
                Your Items{" "}
                <Link to={"/mycart"}>
                  <button>
                    EDIT <BiMessageSquareEdit />
                  </button>
                </Link>
              </h1>
              {userCart.cart.length > 0 ? (
                <div className="orderProductContainer">
                  {userCart.cart.map((item, index) => {
                    return (
                      <div key={index} className="orderProduct">
                        <img src={item.primaryImg} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>
                          $ {item.productPrice}
                          <span>qnt. x {item.quanitity}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                "No item"
              )}
            </div>
            {/* user info */}
            <div className="userInfo">
              <h1>Your details</h1>
              <div className="userInfoContainer">
                {/* personal info */}
                <div className="card">
                  <h4>Name and phone</h4>
                  <span className="cardInfo">
                    <TiUser />
                    <p>{userState.userInfo.name}</p>
                  </span>
                  <span className="cardInfo">
                    <HiOutlineMail />
                    <p>{userState.userInfo.email}</p>
                  </span>
                  <span className="cardInfo">
                    <BiPhone />
                    <p>
                      <> {userState.userInfo.phoneNumber}</>
                      {userState.userInfo.secondaryPhoneNumber !== null ? (
                        <>, {userState.userInfo.secondaryPhoneNumber}</>
                      ) : (
                        ""
                      )}
                    </p>
                  </span>
                </div>
                {/* address info */}
                <div className="card">
                  <h4>
                    Shipping Address{" "}
                    <Link to={"/myprofile"}>
                      <button>
                        EDIT <BiMessageSquareEdit />
                      </button>
                    </Link>
                  </h4>
                  <span className="cardInfo">
                    <FaRegAddressCard />
                    <p>
                      {userState.userInfo.city}, {userState.userInfo.state}{" "}
                      <br />
                      {userState.userInfo.landmark},{" "}
                      {userState.userInfo.house_flat_no} <br />
                      {userState.userInfo.address}
                    </p>
                  </span>
                  <span className="cardInfo">
                    <BiMapPin />
                    <p>{userState.userInfo.pincode}</p>
                  </span>
                </div>
                {/* Payment method */}
                <div className="card">
                  <h4>Amount to pay</h4>
                  <span className="cardInfo">
                    <HiOutlineCash />
                    <p>
                      Payment Method : <span> Cash on deleivery</span>
                    </p>
                  </span>
                  <span className="cardInfo">
                    <HiCash />
                    <p>
                      Sub total :<span>$ {totalAmount}</span>
                    </p>
                  </span>
                  <span className="cardInfo">
                    <HiOutlineReceiptTax />
                    <p>
                      Taxes : <span>Free</span>
                    </p>
                  </span>
                  <span className="cardInfo">
                    <p>
                      <span></span>
                      <strong> Total Price : $ {totalAmount}</strong>
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="confirmOrder">
            <Button onClick={() => placeorderHandler()}>Confirm order</Button>
          </div>
        </div>
      ) : (
        <RingLoader />
      )}
    </>
  );
};

export default PlaceOrder;
