import React, { useEffect } from 'react'
import './About.css'
import { Link } from "react-router-dom"

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className='about'>
      <div className='aboutTitle'>
        <h2>About</h2>
      </div>
      <div className='aboutContent'>
        <section className='acrs'>
          <h3>Company Overview</h3>
          <p>
            The Company first online retailer to globally distribute a wide
            range of fashion, beauty and lifestyle products from Asia through
            their website example.com. Every season brings customers the
            latest trends along with thousands of items from brands across Asia.
            example.com now represents the best platform for brands in Asia
            to connect with customers worldwide.
          </p>

          <h3>Company Mission</h3>
          <p>
            The company brings the latest fashion trends to customers worldwide.
            Launched in July 2020, the example.com website leverages the success
            of a proven e-commerce platform and technology to deliver customers
            an exciting and unique destination for fashion, beauty, and lifestyle
            products.
          </p>

          <h3>Company Vision</h3>
          <p>
            To provide customers with an exciting shopping experience, superior
            service, and a fine selection of affordable, high-quality fashion,
            beauty, and lifestyle products.
          </p>

          <img src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646910/eway/other/about2_nsnt01.jpg" alt="about2img" />
          <h3>Company Intro</h3>
          <p>
            To provide customers with an exciting shopping experience, superior
            service, and a fine selection of affordable, high-quality fashion,
            beauty, and lifestyle products.
          </p>
        </section>
        <section className='acls'>
          <img src="https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/other/about1_om5e4d.jpg" alt="about1img" />
          <h3>Company Profile</h3>
          <p>
            The Company first online retailer to globally distribute a wide
            range of fashion, beauty and lifestyle products from Asia through
            their website example.com. Every season brings customers the
            latest trends along with thousands of items from brands across Asia.
            example.com now represents the best platform for brands in Asia
            to connect with customers worldwide.
          </p>

          <h3>Mission 2030</h3>
          <p>
            The company brings the latest fashion trends to customers worldwide.
            Launched in July 2030, the example.com website leverages the success
            of a proven e-commerce platform and technology to deliver customers
            an exciting and unique destination for fashion, beauty, and lifestyle
            products.
          </p>
          <p>
            offers express shipping on all orders. Shipments arrive within approximately
            3 working days from date of dispatch. Our ecommerce Phasellus luctus id
            turpis cursus. Donec at augue dictum dolor In tempor ultrices est,
          </p>
        </section>
      </div>
      <div className='needToKnow'>
        <h1>Need to Know anything contact us</h1>
        <button>
          <Link to={'/contact'}>
            Contact us
          </Link>
        </button>
      </div>
    </div>
  )
}

export default About;