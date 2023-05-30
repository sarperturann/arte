import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { _id, img1, img2, name, price } = product;
  return (
    <div className='productCard'>
      <Link to={`/shop/${_id.substr(1, 5)}`} state={{ product }}>
        <div className='productImage'>
          <img id='hideOnHover' src={img1} alt="prdouct1a" />
          <img src={img2} alt="prdouct1b" />
        </div>
        <div className='productDetail'>
          <h5>{name}</h5>
          <p>{`$ ${price}`}</p>
        </div>
      </Link>
    </div>
  )
}
export default Product;