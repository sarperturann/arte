import React, { useState, useEffect } from "react";
import "./Contact.css";
import { useSelector, useDispatch } from "react-redux";
import { SpinLoader } from "../../components"
import { sendMessageContact } from "../../actions/utilsAction";

const Contact = () => {
  let userName = localStorage.getItem("userName");
  let userEmail = localStorage.getItem("userEmail");
  const [userMessage, setUserMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const dispatch = useDispatch();
  const contactState = useSelector(state => state.sendMessage);

  // on input set values 
  const onChangeHandler = (e) => {
    let obj = {
      ...userMessage,
      [e.target.name]: e.target.value
    }
    setUserMessage(obj)
  };

  // on form submit
  const submitHandler = (e) => {
    e.preventDefault();
    if (userName !== null) {
      let msg = {
        ...userMessage,
        name: userName,
        email: userEmail
      }
      alert("up")
      console.log(msg)
      dispatch(sendMessageContact(msg));
    } else {
      alert("low")
      dispatch(sendMessageContact(userMessage));
    }
    let obj = {
      ...userMessage,
      subject: "",
      message: ""
    }
    setUserMessage(obj)
  };

  // to scroll on top automatically
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="contact">
      <div className="contactTitle">
        <h2>Contact</h2>
      </div>
      <div className="contactContain">
        <form onSubmit={(e) => submitHandler(e)} method='post'>
          <input
            type="text"
            value={userName === null ? userMessage.name : userName}
            disabled={userName === null ? false : true}
            onChange={(e) => onChangeHandler(e)}
            name="name"
            required
            placeholder="Your Name*"
          />
          <input
            type="text"
            value={userEmail === null ? userMessage.email : userEmail}
            disabled={userEmail === null ? false : true}
            onChange={(e) => onChangeHandler(e)}
            name="email"
            required
            placeholder="Your email*"
          />
          <input
            type="text"
            value={userMessage.subject}
            onChange={(e) => onChangeHandler(e)}
            name="subject"
            required
            placeholder="Subject*"
          />
          <textarea
            value={userMessage.message}
            onChange={(e) => onChangeHandler(e)}
            name="message"
            required
            cols="30"
            rows="5"
            placeholder="Your message*"
          />
          {
            <button type="submit" disabled={contactState.loading}>
              {contactState.loading ?
                <SpinLoader /> :
                'Submit'
              }
            </button>
          }
        </form>
        <iframe
          title="title"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d799.3767466570656!2d-119.79190944149457!3d36.734400094707375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8094609fa2bf2f13%3A0xca2c81043383dae1!2sFamily%20Fashions!5e0!3m2!1sen!2sin!4v1653573489461!5m2!1sen!2sin"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="map"
        />
      </div>
    </div>
  );
};

export default Contact;
