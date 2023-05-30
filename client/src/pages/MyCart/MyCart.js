import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MyCart.css";
import { RingLoader } from "../../components/MyUtils/Loaders";
import Cookies from "universal-cookie";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { updateCart, deleteProduct } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { getCartbyUser } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  let tkn = cookies.get("tkn");
  const [placeOrUpdate, setPlaceOrUpdate] = useState(true);
  const userState = useSelector((state) => state.userLogin);
  const userCart = useSelector((state) => state.cart);
  const [newCart, setNewCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateQnt = (val, action, id) => {
    newCart.filter((item) => {
      if (item.id === id && action === "dec") {
        val !== 1
          ? (item.quanitity = val - 1)
          : toast.error(`Minimum Quantity 1 required.`);
      } else if (item.id === id && action === "inc") {
        item.quanitity = val + 1;
      }
      return null;
    });
    setNewCart([...newCart]);
    if (JSON.stringify(userCart.cart) === JSON.stringify(newCart)) {
      setPlaceOrUpdate(true);
    } else {
      setPlaceOrUpdate(false);
    }
    calculateTotal();
  };

  const removeItem = async (id) => {
    let tempCart = newCart.filter((item) => {
      return item.id !== id;
    });
    setNewCart(tempCart);
    dispatch(deleteProduct(id));
  };

  const calculateTotal = () => {
    let value = 0;
    for (let i = 0; i < newCart.length; i++) {
      value = value + newCart[i].productPrice * newCart[i].quanitity;
    }
    setTotalAmount(value);
  };

  useEffect(() => {
    if (tkn !== undefined) {
      dispatch(getCartbyUser("getCartbyUser"));
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewCart(JSON.parse(JSON.stringify(userCart.cart)));
  }, [userCart.cart]); // eslint-disable-line

  useEffect(() => {
    calculateTotal();
  }, [newCart]); // eslint-disable-line

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <div className="mycart">
      {userState.authtokken === null && tkn === undefined ? (
        <div className="notLoggedin">
          <AiOutlineShoppingCart />
          <p>Please login to see your item's.</p>
        </div>
      ) : userCart.fetching === true ? (
        <RingLoader />
      ) : (
        <div>
          <nav>
            <h1>Your Shopping Cart</h1>
            <div>
              <strong>Total : $ {totalAmount} </strong>
              {placeOrUpdate ? (
                <button
                  onClick={() => navigate("/placeorder")}
                  disabled={totalAmount === 0 ? true : false}
                  style={{ backgroundColor: "var(--lightGreen2)" }}
                >
                  Place Order
                </button>
              ) : (
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() => {
                    dispatch(updateCart(newCart));
                    setPlaceOrUpdate(true);
                  }}
                >
                  Update Cart
                </button>
              )}
            </div>
          </nav>
          <section>
            {newCart.length > 0 ? (
              newCart.map((item) => {
                return (
                  <div key={item.id} className="cartItem">
                    <span
                      className="removeButton"
                      onClick={() => removeItem(item.id)}
                    >
                      <MdDeleteOutline />
                    </span>
                    <img src={item.primaryImg} alt={item.name} />
                    <div className="cartItemMiddleArea">
                      <div className="cartItemAbout">
                        <h4>{item.name}</h4>
                        <p>Product Id _{item.id.slice(0, 7)}</p>
                      </div>
                      <span className="cartItemAmount">
                        <button
                          onClick={() =>
                            updateQnt(item.quanitity, "dec", item.id)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quanitity}
                          onChange={() => { }}
                        />
                        <button
                          onClick={() =>
                            updateQnt(item.quanitity, "inc", item.id)
                          }
                        >
                          +
                        </button>
                      </span>
                    </div>
                    <h2>
                      Total : $ {item.productPrice * item.quanitity} <br />
                      <span>per unit $ {item.productPrice}</span>
                    </h2>
                  </div>
                );
              })
            ) : (
              <div className="notLoggedin">
                <AiOutlineShoppingCart />
                <p>Your e-way cart is empty.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MyCart;
