import React from 'react'
import './userdropdown.css'
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { userLogout } from '../../actions/userActions';
import { cleanCart } from '../../actions/cartAction';

const Userdropdown = ({update}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let name = localStorage.getItem('userName')
  let email = localStorage.getItem('userEmail')
  const logout = () => {
    dispatch(userLogout());
    dispatch(cleanCart());
    update(false);
    navigate('/')
  } 
  return (
    <div className='userDropdown'>
        <div className='upperTriangle'></div>
        <h2>{name}</h2>
        <p>{email}</p>
        <hr />
        <li onClick={() => logout()}><FiLogOut />Logout</li>
    </div>
  )
}
export default Userdropdown;