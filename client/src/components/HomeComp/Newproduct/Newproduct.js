import React, { useState, useEffect } from 'react'
import './Newproduct.css'
import { Product, RingLoader } from '../../index'
import { useSelector } from 'react-redux'

const Newproduct = () => {
  const productState = useSelector(state => state.getallProducts);
  const { products } = productState;

  const artworkImagesState = useSelector(state => state.getArtworkImages);
    const artworkImages = artworkImagesState.products;
    const artworkDetailsState = useSelector(state => state.getArtwork);
    const artworkDetails = artworkDetailsState.products;
    const [totalProduct, setTotalProduct] = useState(8)
    const [catOption, setCatOption] = useState('All Products');

    const [filteredProduct, setFilteredProduct] = useState([]);
    const loadmore = () => {
        setTotalProduct(totalProduct + 8)
    };
    const filterArray = async () => {
        let productArray = await products.filter(item => {
            return item.category.toString().includes(catOption) === true ? item : null
        })
        setFilteredProduct(productArray);
    }
    useEffect(() => {
        if (products !== null) {
            if (catOption === 'All Products') {
                setFilteredProduct([...products])
            } else {
                filterArray()
            }
        }
        if (window.history.state.usr !== null) {
            setCatOption(window.history.state.usr.category)
            window.history.state.usr = null;
        }
    }, [catOption, products]) 


    return (
      <>
           <div className='new product'>
            <section className = 'npHeading'>
              <span>Our Store </span>
              <h3 >Browse our new collection!</h3>
            </section>


           </div>
          
          {products !== null ?
              <>
                  <nav className='shopItemNav'>
                     
                      <div className='leftNav'>
                      </div>
                  </nav>
                  <section className='itemgallery'>
                      {filteredProduct.slice(8,12).map(((product, index) =>
                          <Product key={index} product={product} artworkImage={artworkImages[index]} artwork={artworkDetails[index]}/>
                      ))}
                  </section>
              </>
              : ''
          }
         
      </>
  );
}

export default Newproduct;