import React, { useState, useEffect } from 'react'
import './ShopItems.css'
import { useSelector } from 'react-redux'
import { Product, RingLoader, Dropdown } from '../../index'
import { Button } from '@mui/material'

const ShopItems = () => {
    const productState = useSelector(state => state.getallProducts);
    const { products } = productState;
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
    }, [catOption, products]) // eslint-disable-line
    return (
        <>
            {products !== null ?
                <>
                    <nav className='shopItemNav'>
                        <Dropdown catOption={catOption} setCatOption={setCatOption} />
                        <div className='leftNav'>
                            <span>
                                {`Showing 1 - 
                                ${totalProduct > filteredProduct.length ?
                                        filteredProduct.length :
                                        totalProduct} of ${filteredProduct.length} 
                                products`}
                            </span>
                            {/* <span>Filter +</span>
                            <span>
                                <BsFillGrid3X3GapFill />
                            </span> */}
                        </div>
                    </nav>
                    <section className='itemgallery'>
                        {filteredProduct.slice(0, totalProduct).map(((product, index) =>
                            <Product key={index} product={product} />
                        ))}
                    </section>
                </>
                : ''
            }
            {products === null ?
                <RingLoader /> :
                totalProduct >= 43 ? "" :
                    <div className='loadmore'>
                        <Button size='small' onClick={() => loadmore()}>Load More</Button>
                    </div>
            }
        </>
    );
}

export default ShopItems;