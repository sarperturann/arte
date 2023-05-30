import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = ({ product, artworkImage, artwork }) => {
  const { _id, name, price } = product;
  let artworkId, artworkTitle, price2;

  if (artwork) {
    artworkId = artwork.id;
    artworkTitle = artwork.title;
    price2 = artwork.price;
  }
  return (
    <div className='productCard'>
      <Link to={`/shop/${_id.substr(1, 5)}`} state={{ product }}>
        <div className='productImage'>
          <img src={artworkImage} alt="prdouct1a" />
        </div>
        <div className='productDetail'>
          <h5>{artworkTitle}</h5>
          <p>{`$ ${price2}`}</p>
        </div>
      </Link>
    </div>
  )
}
export default Product;