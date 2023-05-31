import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MyCart.css";
import { RingLoader } from "../../components/MyUtils/Loaders";
import Cookies from "universal-cookie";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { updateCart, deleteProduct } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { getCartbyUser,getArtworkbyId } from "../../actions/cartAction";
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

  const [newCartBiz, setNewCartBiz] = useState([]);
  const artworks = useSelector((state) => state.artworks);
  const [totalAmount, setTotalAmount] = useState(0);
console.log(userCart.cart)
console.log(userCart.artworks)



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

   // eslint-disable-line

  useEffect(() => {
    calculateTotal();
  }, [newCart]); // eslint-disable-line

  useEffect(() => {
    const fetchArtworksDetails = async () => {
      if (userCart && userCart.cart && userCart.cart.artworks) {
        userCart.cart.artworks.map(id => dispatch(getArtworkbyId(id)));
      }
    };
  
    fetchArtworksDetails();
  }, [userCart, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <section>
     {Object.keys(userCart.artworks).length > 0 ? (
      Object.values(userCart.artworks).map((artwork) => {
        return (
          <div key={artwork.id} className="cartItem">
            <span
              className="removeButton"
              onClick={() => removeItem(artwork.id)}
            >
              <MdDeleteOutline />
            </span>
            <div className="cartItemMiddleArea">
              <div className="cartItemAbout">
                <h4>{artwork.title}</h4>
                <p>Product Id _{artwork.id}</p>
              </div>
            </div>
            <h2>
              Price : $ {artwork.price} 
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
  );
}


export default MyCart;
