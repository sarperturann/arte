import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    const navigate = useNavigate()
    const clickhandler = (value) => {
        navigate('/shop', {state : {
            category : value
        }})
    }
    return(
        <div className='bannerSection'>
            <div className='bsc' onClick={() => clickhandler('Men Collection')}>
                <img className='bscImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646907/eway/banner/banner1_sh77zm.jpg" alt="banner1" />
                <div className='bannerOptions'>
                    <span>Sunglass</span>
                    <h4>Men top Collection</h4>
                    <button>Shop Now</button>
                </div>
            </div>
            <div className='bsc' onClick={() => clickhandler('Women Collection')}>
                <img className='bscImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646908/eway/banner/banner2_tev0t8.jpg" alt="banner2" />
                <div className='bannerOptions'>
                    <span>Jewellry</span>
                    <h4>Women top Collection</h4>
                    <button>Shop Now</button>
                </div>
            </div>
        </div>
    );
}

export default Banner;