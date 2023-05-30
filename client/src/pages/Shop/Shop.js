import React, { useEffect } from 'react'
import './Shop.css'
import ShopItems from '../../components/Shop/ShopItems/ShopItems'
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
      <ShopItems />
    </div>
  )
}

export default Shop;