import React from 'react'
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerHead'>
        <span className="arte" style={{ color: 'black', fontSize: '24px' }}>Arte</span>
      </div>
     
      <section className='footerFoot'>
        <ul className='checkout'>
          {/* Rest of the code */}
        </ul>
        <span className='credits'>Designed by Kumori.</span>
        <ul className='socialHandels'>
          {/* Rest of the code */}
        </ul>
      </section>
    </footer>
  );
};


export default Footer;