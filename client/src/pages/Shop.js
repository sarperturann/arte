import React, { useEffect } from 'react'
import './Shop.css'
//import ShopItems from '../components/ShopItems'
import { Link } from 'react-router-dom'

 const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h2>Shop</h2>
        <p>
          <Link to='/'>
            <strong>Home </strong>
          </Link>
          / Product
        </p>
      </div>
    
    </div>
  )
}

export default Shop;