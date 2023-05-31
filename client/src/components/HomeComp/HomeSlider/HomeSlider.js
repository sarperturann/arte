import React from 'react';
import './HomeSlider.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';
import { EffectFade, Navigation, Autoplay } from "swiper";

const HomeSlider = () => {
  return (
    <>
      <Swiper
        effect='fade'
        navigation={true}
        loop={true}
        speed={900}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay, EffectFade]}
        className="mySwiper">
        <SwiperSlide>
          <div className='banner'>
            <img className='bannerImg' src="https://rare-gallery.com/uploads/posts/1007423-painting-birds-sea-bay-water-rock-nature-shore-artwork-clouds-beach-storm-waves-coast-cliff-wind-oil-painting-cloud-ocean-wave-material-Rapid-atmospheric-phenomenon-bod.jpg" alt="banner3" />
            <section className='offer leftSideOffer'>
              <span></span>
              <h1>ART IS <br />EVERYTHING</h1>
              <p>CHECK OUT OUR NEW <br /> COLLECTION FOR <br /> THE BEST ART PIECES!</p>
              <div>
                <Link to='./blog'>
                  <button className='readMore'>READ MORE</button>
                </Link>
                <Link to='./shop'>
                  <button className='showMore'>SHOP NOW</button>
                </Link>
              </div>
            </section>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='banner'>
            <img className='bannerImg' src="https://rare-gallery.com/uploads/posts/5362804-painting-art-contemporary-texture-vibrant-color-colour-acrylic-creative-design-modern-vibrant-color-expressionism-abstract-expressionism-acrylic-paint-modern-art-contemporary-art-wall-art-wall.jpg" alt="banner2" />
            <section className='offer rightSideOffer'>
              <span>SPECIAL ARTISTS</span>
              <h1>PAINTING <br />IS JUST ANOTHER WAY OF KEEPING A DIARY</h1>
              <p>CHECK OUT THE<br /> BEST PIECES OF OUR ARTISTS <br /> </p>
              <div>
                <Link to='./blog'>
                  <button className='readMore'>READ MORE</button>
                </Link>
                <Link to='./shop'>
                  <button className='showMore'>SHOP NOW</button>
                </Link>
              </div>
            </section>
          </div>
        </SwiperSlide>

      
        
       
      </Swiper>
    </>
  )
}

export default HomeSlider;