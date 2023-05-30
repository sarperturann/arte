import React, { useState, useEffect } from "react";
import "./login.css";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { SpinLoader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userSignup } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = ({ update }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.userLogin);
    const signupState = useSelector((state) => state.userSignup);
    const [form, setForm] = useState(true); // conditionaly render login logout form
    // login form initialstate
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    // signup form initialstate
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        checkpassword: "",
        phoneNumber: "",
        secondaryPhoneNumber: "",
        address: "",
        house_flat_no: "",
        city: "",
        state: "",
        landmark: "",
        pincode: ""
    });

    // login page function
    const onchangeoflogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(loginData.email, loginData.password));
        navigate('/')
    };

    // Signup page function
    const onchangeofsignup = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };
    const signupHandler = (e) => {
        e.preventDefault();
        signupData.password === signupData.checkpassword
            ? dispatch(userSignup(signupData))
            : toast.error("Password not matched !");
    };

    useEffect(() => {
        if (signupState.user) {
            setForm(true);
            setLoginData({
                email: "",
                password: "",
            });
        }
    }, [signupState]);

    return (
        <div className="loginBox">
            <header>
                <h2>My Account</h2>
                <GrClose onClick={() => update(false)} />
            </header>
            {form ? (
                <div className="form">
                    <form onSubmit={loginHandler} className="loginwala">
                        <h4>Login Form</h4>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            placeholder="Enter your email id"
                            onChange={onchangeoflogin}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            placeholder="Password"
                            onChange={onchangeoflogin}
                            required
                        />
                        <button type="submit">
                            {userState.loading ? <SpinLoader /> : "Login Account"}
                        </button>
                    </form>
                    <span>Don't have account ?</span>
                    <button onClick={() => setForm(false)}>Register Now</button>
                </div>
            ) : (
                <div className="form">
                    <form onSubmit={signupHandler}>
                        <h4>Register Form</h4>
                        <input
                            type="text"
                            name="name"
                            value={signupData.name}
                            placeholder="Enter your username *"
                            onChange={onchangeofsignup}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={signupData.email}
                            placeholder="Enter your email id *"
                            onChange={onchangeofsignup}
                            required
                        />
                        <section>
                            <input
                                type="number"
                                name="phoneNumber"
                                value={signupData.phoneNumber}
                                placeholder="Primary Phone no. *"
                                onChange={onchangeofsignup}
                                required
                            />
                            <input
                                type="number"
                                name="secondaryPhoneNumber"
                                value={signupData.secondaryPhoneNumber}
                                placeholder="Secondary Phone no. (optional)"
                                onChange={onchangeofsignup}
                            />
                        </section>
                        <section>
                            <input
                                type="text"
                                name="city"
                                value={signupData.city}
                                placeholder="City *"
                                onChange={onchangeofsignup}
                                required
                            />
                            <input
                                type="text"
                                name="state"
                                value={signupData.state}
                                placeholder="State"
                                onChange={onchangeofsignup}
                            />
                        </section>
                        <section>
                            <input
                                type="number"
                                name="pincode"
                                value={signupData.pincode}
                                placeholder="PINCODE *"
                                onChange={onchangeofsignup}
                                required
                            />
                            <input
                                type="text"
                                name="landmark"
                                value={signupData.landmark}
                                placeholder="Landmark"
                                onChange={onchangeofsignup}
                            />
                        </section>
                        <section>
                            <input
                                type="text"
                                name="address"
                                value={signupData.address}
                                placeholder="Address"
                                onChange={onchangeofsignup}
                            />
                            <input
                                type="text"
                                name="house_flat_no"
                                value={signupData.house_flat_no}
                                placeholder="House/Flat no"
                                onChange={onchangeofsignup}
                            />
                        </section>
                        <input
                            type="password"
                            name="password"
                            value={signupData.password}
                            placeholder="Enter your Password *"
                            onChange={onchangeofsignup}
                            required
                        />
                        <input
                            type="password"
                            name="checkpassword"
                            value={signupData.checkpassword}
                            placeholder="Confirm Password *"
                            onChange={onchangeofsignup}
                            required
                        />
                        <button type="submit">
                            {signupState.loading ? <SpinLoader /> : "Register Account"}
                        </button>
                    <div className="formNote">* Can't be empty.</div>
                    </form>
                    <span>Already have an account ?</span>
                    <button onClick={() => setForm(true)}>Login Account</button>
                </div>
            )}
        </div>
    );
};

export default Login;
