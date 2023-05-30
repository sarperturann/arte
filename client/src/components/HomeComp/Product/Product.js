import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = ({ product, artworkImage, artwork }) => {
  const { _id, name, price } = product;
  let artworkId, artworkTitle, price2,genre,dimensions,yearcreated,isSold;
  let artistId, artistName, artistYears,artistBio, artistGenre, artistNationality;
console.log(artwork);
  if (artwork) {
    artworkId = artwork.id;
    artworkTitle = artwork.title;
    price2 = artwork.price;
    genre = artwork.genre;
    dimensions = artwork.dimensions;
    yearcreated = artwork.yearcreated;
    isSold = artwork.isSold;
    if(artwork.artist)
    {
      artistId = artwork.artist.id;
      artistName = artwork.artist.name;
      artistYears = artwork.artist.years;
      artistBio = artwork.artist.bio;
      artistGenre = artwork.artist.genre;
      artistNationality = artwork.artist.nationality;
    }
  }
  return (
    <div className='productCard'>
      <Link to={`/shop/${_id.substr(1, 5)}`} state={{ product,artwork,artworkImage }}>
        <div className='productImage'>
          <img className="product-img" src={artworkImage} alt="prdouct1a" />
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