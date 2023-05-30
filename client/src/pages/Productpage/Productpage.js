import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Preview, ProductpageDetail } from '../../components';
import "./Productpage.css"

const Productpage = () => {
  // getting data
  const location = useLocation();
  const { name, img1, img2, description, price, tags, _id } = location.state.product;

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // eslint-disable-line

  return (
    <div className='productPage'>
      <section className='sec1'>
        <Preview img1={img1} img2={img2} />
        <ProductpageDetail
          name={name}
          description={description}
          price={price}
          tags={tags}
          id={_id}
          primaryImg={img1}
        />
      </section>
    </div>
  )
}

export default Productpage;