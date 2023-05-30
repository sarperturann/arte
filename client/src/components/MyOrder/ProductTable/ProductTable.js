import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { useDispatch } from "react-redux";
import { CgShoppingBag } from "react-icons/cg";
import { PopupModal } from "../../index";
import { cancleUserOrder } from "../../../actions/orderActions";

const ProductTable = ({ data, index }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [delDate, setDelDate] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const calculateTotal = () => {
    let value = 0;
    for (let i = 0; i < data.items.length; i++) {
      value = value + data.items[i].productPrice * data.items[i].quanitity;
    }
    setTotalAmount(value);
    let date = new Date(data.orderPlaced);
    date.setDate(date.getDate() + 7);
    date = date.toString().split(" ");
    let newdate = `${date[1]} ${date[2]}, ${date[3]}`;
    setDelDate(newdate);
  };
  useEffect(() => {
    calculateTotal();
  });
  return (
    <div className="orderCard">
      <PopupModal open={open} handleClose={handleClose} data={data} />
      <h3>
        <span>
          <CgShoppingBag /> {index}
        </span>{" "}
        Delivery by {delDate}
      </h3>
      <table className="myorderTable">
        <tbody>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          {data.items.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td className="itemImageOrders">
                  <img src={data.primaryImg} alt={data.name} />
                </td>
                <td>{data.name}</td>
                <td>x{data.quanitity}</td>
                <td>$ {data.productPrice}</td>
                <td>$ {data.quanitity * data.productPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="myorderTableMobile">
      {data.items.map((data, index) => {
        return (
          <div key={index} className="productCardinMyOreders">
            <img src={data.primaryImg} alt={data.name} />
            <div className="productCardinMyOredersDetials">
              <h3>{data.name}</h3>
              <p>
                <span>Quantity : x{data.quanitity} | </span>
                <span>$ {data.productPrice} per unit</span>
              </p>
              <p>
                <strong>Total : $ {data.quanitity * data.productPrice}</strong>
              </p>
            </div>
          </div>
        );
      })}
      </div>
      <h4>
        <span>
          <button onClick={() => handleClickOpen()}>See Details</button>
          <button
            className="danger"
            onClick={() => dispatch(cancleUserOrder(data._id))}
          >
            Cancel Order
          </button>
        </span>
        Total : $ {totalAmount}
      </h4>
    </div>
  );
};

export default ProductTable;
