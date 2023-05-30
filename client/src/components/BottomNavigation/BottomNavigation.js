import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { GoHome } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./bottomNavigationBar.css";

const BottomNavigationbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  // to navigate page
  const onClickHandler = (path) => {
    let switchto = `${path}`
    navigate(switchto)
  }

  return (
    <div className="bottomNavigationBar">
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className="bottomNavigationBarBox"
        >
          <BottomNavigationAction label="HOME" icon={<GoHome />} onClick={() => onClickHandler("/")}/>
          <BottomNavigationAction label="SHOP" icon={<BiShoppingBag />} onClick={() => onClickHandler("/shop")}/>
          <BottomNavigationAction label="BLOG" icon={<AiOutlineRead />} onClick={() => onClickHandler("/blog")}/>
          <BottomNavigationAction
            label="CART"
            icon={<AiOutlineShoppingCart />}
            onClick={() => onClickHandler("/mycart")}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default BottomNavigationbar;
