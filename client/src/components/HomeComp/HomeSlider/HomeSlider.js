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
            <img className='bannerImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/homeSlide/slider4_gqz07j.jpg" alt="banner3" />
            <section className='offer leftSideOffer'>
              <span>SUMMER 30</span>
              <h1>NEW HOT <br />EVERYTHING</h1>
              <p>CHECK OUT SUMMER <br /> COLLECTION FIRST COME TO GET <br /> THE BEST!</p>
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
            <img className='bannerImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/homeSlide/slider3_adqbhb.jpg" alt="banner2" />
            <section className='offer rightSideOffer'>
              <span>SPRING SPECIAL</span>
              <h1>BECAUSE IMAGE<br />IS EVERYTHING</h1>
              <p>CHECK OUT SUMMER <br /> COLLECTION FIRST COME TO GET <br /> THE BEST!</p>
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
            <img className='bannerImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1681563758/eway/homeSlide/sllider_3_nl2uir.png" alt="banner1" />
            <section className='offer leftSideOffer'>
              <span style={{ color: "#d23315" }}>REEBOK SPECIAL</span>
              <h1>IMPOSSIBLE IS<br />NOTHING</h1>
              <p>CHECK OUT SUMMER <br /> COLLECTION FIRST COME TO GET <br /> THE BEST!</p>
              <div>
                <Link to='./blog'>
                  <button className='readMore' style={{ backgroundColor: "#d23315" }}>READ MORE</button>
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
            <img className='bannerImg' src="https://res.cloudinary.com/inovatormatin/image/upload/v1681920543/eway/homeSlide/banner3_4x_yn3eoh.png" alt="banner4" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default HomeSlider;