import React from 'react'
import './Newproduct.css'
import { Product, RingLoader } from '../../index'
import { useSelector } from 'react-redux'

const Newproduct = () => {
  const productState = useSelector(state => state.getallProducts);
  const { products } = productState;
  return (
    <div className='newproduct'>
        <section className='npHeading'>
            <span>Our Store</span>
            <h3>New PRODUCTS</h3>
            <p>Browse our New collection according the category top interesting products.</p>
        </section>
        <section className='npgallery'>
            {products !== null ?
            products.slice(8, 12).map(((product, index) => 
            <Product key={index} product={product}/>
            )) 
            : ''}
        </section>
        {products === null ? <RingLoader /> : ''}
    </div>
  )
}

export default Newproduct;