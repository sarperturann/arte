import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Preview, ProductpageDetail } from '../../components';
import "./Productpage.css"

const Productpage = () => {
  // getting data
  const location = useLocation();
  const { name, img1, img2, description, price, tags, _id } = location.state.product;
  const artwork = location.state.artwork;
  const artworkImage = location.state.artworkImage;
  const artist = location.state.artwork.artist;

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <div className='productPage'>
      <section className='sec1'>
        <Preview img1={artworkImage}  />
        <ProductpageDetail
          name={artwork.title}
          description={artwork.dimensions}
          price={artwork.price}
          tags={tags}
          id={_id}
          primaryImg={artworkImage}
        />
      </section>
    </div>
  )
}

export default Productpage;