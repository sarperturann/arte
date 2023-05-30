import React, { useState } from "react";
import "./productpageDetail.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { cart } from "../../../actions/cartAction";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const ProductpageDetail = ({
  name,
  artistName,
  artistBio,
  description,
  genre,
  yearCreated,
  isSold,
  price,
  tags,
  id,
  primaryImg,
}) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let tkn = cookies.get("tkn");
  const userState = useSelector((state) => state.userLogin);
  const cartState = useSelector((state) => state.cart);
  const cartedList = cartState.cart;
  const [product, setProduct] = useState({
    name: name,
    id: id,
    quanitity: 1,
    primaryImg: primaryImg,
    productPrice: price,
  });
  let qnt = product.quanitity;
  const handleChange = (event) => {
    setProduct({ ...product, quanitity: parseInt(event.target.value) });
    qnt = event.target.value;
  };

  // on clicking add to cart
  const cartHandler = () => {
    // checking is user logged in or not
    userState.authtokken === null && tkn === undefined
      ? toast.warn("Please login to add Item !")
      : cartedList.find((item) => item.id === product.id) === undefined
      ? dispatch(cart("add", [...cartedList, product]))
      : toast.info("Item already added");
  };
  return (
    <div className="productPageDetail" style={{ lineHeight: "1.6", color: "#333" }}>
        <h1 style={{ marginBottom: "20px" }}>{name}</h1>

        <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Artist: {artistName}</h3>
            <p>About the artist: {artistBio}</p>
        </div>

        <table style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ fontWeight: "bold", paddingRight: "10px" }}>Description</th>
                <td>{description}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ fontWeight: "bold", paddingRight: "10px" }}>Genre</th>
                <td>{genre}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ fontWeight: "bold", paddingRight: "10px" }}>Year Created</th>
                <td>{yearCreated}</td>
            </tr>
            <tr>
                <th style={{ fontWeight: "bold", paddingRight: "10px" }}>Status</th>
                <td>{isSold ? "This artwork has been sold." : "This artwork is available for purchase."}</td>
            </tr>
        </table>

        <div className="setQuantityAndPrice">
            {cartedList.find((item) => item.id === product.id) === undefined ? (
                <div className="setQuantity">
                    {/* add to cart button */}
                    <span className="cartButton" onClick={() => cartHandler()} style={{ background: "#008000", color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}>
                        ADD TO CART
                    </span>
                </div>
            ) : (
                <div>
                    You already added this item in cart.
                    <p>Go to cart if you want to edit.</p>
                </div>
            )}
            {/* price */}
            <p className="productPagePrice" style={{ marginTop: "20px", fontSize: "20px" }}>
                <label>PRICE </label>
                <span>{`$ ${price}.`}</span>
            </p>
        </div>
    </div>
);
};

export default ProductpageDetail;
