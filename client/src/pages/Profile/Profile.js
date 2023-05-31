import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, userUpdateInfo } from "../../actions/userActions"
import { RingLoader } from "../../components";
import { TiUser } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { BiPhone, BiMapPin, BiBuildingHouse } from "react-icons/bi";
import { GiIsland, GiSmartphone, GiModernCity } from "react-icons/gi";
import { FaCity, FaRegAddressCard } from "react-icons/fa";
import "./Profile.css";
import { Button } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.userLogin);
  const [userInfo, setUserInfo] = useState({});
  const [saveButton, showSaveButton] = useState(true);
  let userEmail = localStorage.getItem('userEmail')
  let userName = localStorage.getItem('name')
  let phoneNumber = localStorage.getItem('phoneNumber')
  let pincode = localStorage.getItem('pincode')
  let city = localStorage.getItem('city')
  let state = localStorage.getItem('state')
  let address = localStorage.getItem('address')
  let landmark = localStorage.getItem('landmark')
  let secondaryPhoneNumber = localStorage.getItem('secondaryPhoneNumber');
  let house_flat_no = localStorage.getItem('house_flat_no');
  console.log(localStorage);

  const setFormValues = (user) => {
    setUserInfo({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      secondaryPhoneNumber: user.secondaryPhoneNumber,
      address: user.address,
      house_flat_no: user.house_flat_no,
      city: user.city,
      state: user.state,
      landmark: user.landmark,
      pincode: user.pincode,
    })
  };

  const onChangeHandler = (e) => {
    let value;
    if (e.target.type === 'number') {
      if (e.target.value === "") {
        value = null
      } else {
        value = JSON.parse(e.target.value)
      }
    } else {
      value = e.target.value
    }
    let newInfo = {
      ...userInfo,
      [e.target.name]: value
    }
    setUserInfo(newInfo)
    if (JSON.stringify(userState.userInfo) === JSON.stringify(newInfo)) {
      showSaveButton(true);
    } else {
      showSaveButton(false);
    }
  }

  const onUpdate = (e) => {
    e.preventDefault()
    showSaveButton(true);
    //dispatch(userUpdateInfo(userInfo))
  }

  useEffect(() => {
    if (userState.userInfo.name === undefined) {
      //dispatch(getUserInfo())
    }
    setFormValues(JSON.parse(JSON.stringify(userState.userInfo)));
  }, [userState]) // eslint-disable-line 

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <>
      { userState.loading !== true ?
        <div className="profileSetting">
          <h2>
            My Profile
          </h2>
          <form method='put' onSubmit={(e) => onUpdate(e)}>
            <div className="profileSetting-form">
              <section>
                <p>
                  <label htmlFor="name"><TiUser />Name</label>
                  <input name="name" type="text" value={userName} disabled />
                </p>
                <p>
                  <label htmlFor="email"><HiOutlineMail />Email</label>
                  <input type="email" value={userEmail} disabled />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="phoneNumber"><GiSmartphone />Phone (primary)</label>
                  <input name="phoneNumber" type="number" value={phoneNumber} disabled />
                </p>
                <p>
                  <label htmlFor="secondaryPhoneNumber"><BiPhone />Phone (secondary)</label>
                  <input name="secondaryPhoneNumber" type="number" value={secondaryPhoneNumber === null ? "" : secondaryPhoneNumber} disabled />
                </p>
                <p>
                  <label htmlFor="pincode"><BiMapPin />Pincode</label>
                  <input name="pincode" type="number" value={pincode} disabled />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="city"><GiModernCity />City</label>
                  <input name="city" type="text" value={city} disabled />
                </p>
                <p>
                  <label htmlFor="state"><FaCity />State</label>
                  <input name="state" type="text" value={state} disabled />
                </p>
                <p>
                  <label htmlFor="house_flat_no"><BiBuildingHouse />House / Flat No.</label>
                  <input name="house_flat_no" type="text" value={house_flat_no} disabled />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="address"><FaRegAddressCard />Address</label>
                  <input name="address" type="text" value={address} disabled />
                </p>
                <p>
                  <label htmlFor="landmark"><GiIsland />Landmark</label>
                  <input name="landmark" type="text" value={landmark} disabled />
                </p>
              </section>
            </div>
            {!saveButton ?
              <span>
                <Button variant="contained" size="small" type="submit">Save</Button>
              </span>
              : ""}
          </form>
        </div>
        :
        <RingLoader />
      }
    </>
  );
};

export default Profile;
