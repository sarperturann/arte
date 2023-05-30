import React from 'react'
import img from '../../img/other/underConst.jpg'
import './404.css'

const UnderDev = () => {
    return (
        <div className='hideBody'>
            <div className='underDev'>
                <img src={img} alt="under development" />
                <h1>Sorry !</h1>
                <p>This website is not responsive for screen size with width less then 767px. We are working on it, we launch new version soon.</p>
            </div>
        </div>
    )
}

export default UnderDev