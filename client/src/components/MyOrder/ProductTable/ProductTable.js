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
  /*
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
  */
 return (
  <div className="orderCard">
    <h3>Order #{index}</h3>
    <table className="myorderTable">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Order Date</th>
          <th>Address</th>
          <th>Total Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.id}</td>
          <td>{data.userId}</td>
          <td>{new Date(data.orderDate).toLocaleDateString()}</td>
          <td>{data.address}</td>
          <td>$ {data.totalAmount}</td>
          <td>{data.status}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
};

export default ProductTable;
