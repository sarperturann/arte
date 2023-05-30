import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Shop,
  Blog,
  Blogpage,
  Productpage,
  MyCart,
  Myorders,
  PlaceOrder,
  SearchPage,
  Profile,
  About,
  Contact,
} from "./pages";
import { Navbar, Footer, Toast, UnderDev, BottomNavigationbar } from "./components";
import { useDispatch } from "react-redux";
import { getallProducts } from "./actions/productActions";
import Cookies from 'universal-cookie'

const App = () => {
  const cookies = new Cookies()
  const dispatch = useDispatch();
  // Online state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  let tkn = cookies.get('tkn');
  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    if (tkn === undefined) {
      window.localStorage.clear();
    }

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]); // eslint-disable-line

  useEffect(() => {
    dispatch(getallProducts());
  }, []); // eslint-disable-line
  return (
    <>
      <div className="displayBody">
        <Navbar />
        <BottomNavigationbar />
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route exact path="/blog/:id" element={<Blogpage />} />
          <Route exact path="/shop/:id" element={<Productpage />} />
          <Route path="/about" element={<About />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
      <UnderDev />
    </>
  );
};

export default App;
