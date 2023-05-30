import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = ({ product, artworkImage }) => {
  const { _id, name, price } = product;
  return (
    <div className='productCard'>
      <Link to={`/shop/${_id.substr(1, 5)}`} state={{ product }}>
        <div className='productImage'>
          <img src={artworkImage} alt="prdouct1a" />
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