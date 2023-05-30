import React from 'react'
import './Ourstore.css'
import { Product, RingLoader } from '../../index'
import { useSelector } from 'react-redux'

const Ourstore = () => {
  const productState = useSelector(state => state.getallProducts);
  const { products } = productState;
  return (
    <div className='ourStore'>
        <section className='storeHeading'>
            <span>Our Store</span>
            <h3>TOP SELLING PRODUCTS</h3>
            <p>You’ll definitely find that you are looking for. Browse our collection according the category top interesting products.</p>
        </section>
        <section className='storegallery'>
        {products !== null ?
          products.slice(0, 8).map(((product, index) => 
          <Product key={index} product={product}/>
          )) 
          : '' }
        </section>
        {products === null ? <RingLoader /> : ''}
    </div>
  )
}

export default Ourstore;