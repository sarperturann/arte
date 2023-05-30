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
    dispatch(userUpdateInfo(userInfo))
  }

  useEffect(() => {
    if (userState.userInfo.name === undefined) {
      dispatch(getUserInfo())
    }
    setFormValues(JSON.parse(JSON.stringify(userState.userInfo)));
  }, [userState]) // eslint-disable-line 

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <>
      {userInfo.name !== undefined && userState.loading !== true ?
        <div className="profileSetting">
          <h2>
            My Profile
          </h2>
          <form method='put' onSubmit={(e) => onUpdate(e)}>
            <div className="profileSetting-form">
              <section>
                <p>
                  <label htmlFor="name"><TiUser />Name</label>
                  <input name="name" type="text" value={userInfo.name} onChange={e => onChangeHandler(e)} required />
                </p>
                <p>
                  <label htmlFor="email"><HiOutlineMail />Email</label>
                  <input type="email" defaultValue={userInfo.email} disabled />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="phoneNumber"><GiSmartphone />Phone (primary)</label>
                  <input name="phoneNumber" type="number" value={userInfo.phoneNumber === null ? "" : userInfo.phoneNumber} onChange={e => onChangeHandler(e)} required />
                </p>
                <p>
                  <label htmlFor="secondaryPhoneNumber"><BiPhone />Phone (secondary)</label>
                  <input name="secondaryPhoneNumber" type="number" value={userInfo.secondaryPhoneNumber === null ? "" : userInfo.secondaryPhoneNumber} onChange={e => onChangeHandler(e)} />
                </p>
                <p>
                  <label htmlFor="pincode"><BiMapPin />Pincode</label>
                  <input name="pincode" type="number" value={userInfo.pincode} onChange={e => onChangeHandler(e)} required />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="city"><GiModernCity />City</label>
                  <input name="city" type="text" value={userInfo.city} onChange={e => onChangeHandler(e)} required />
                </p>
                <p>
                  <label htmlFor="state"><FaCity />State</label>
                  <input name="state" type="text" value={userInfo.state} onChange={e => onChangeHandler(e)} />
                </p>
                <p>
                  <label htmlFor="house_flat_no"><BiBuildingHouse />House / Flat No.</label>
                  <input name="house_flat_no" type="text" value={userInfo.house_flat_no} onChange={e => onChangeHandler(e)} />
                </p>
              </section>
              <section>
                <p>
                  <label htmlFor="address"><FaRegAddressCard />Address</label>
                  <input name="address" type="text" value={userInfo.address} onChange={e => onChangeHandler(e)} />
                </p>
                <p>
                  <label htmlFor="landmark"><GiIsland />Landmark</label>
                  <input name="landmark" type="text" value={userInfo.landmark} onChange={e => onChangeHandler(e)} required />
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
