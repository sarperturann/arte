import React, { useEffect } from 'react'
import './blogpage.css'
import { useLocation, Link } from "react-router-dom";

const Blogpage = () => {
    const location = useLocation();
    const { author, description, id, img, title, date } = location.state.data;
    
    // to scroll on top automatically
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
    return (
        <div id={id} className="blogpage">
            <div className='blogPageTitle'>
                <h2>{title}</h2>
                <p>
                    <Link to='/'>
                        <strong>Home </strong>
                    </Link>
                    <Link to='/blog'>
                        / Blog
                    </Link>
                    <span> / {title}</span>
                </p>
            </div>
            <div className="blog-content">
                <img className='blogImage' src={img} alt={title} />
                {description.split('\n').map((par, index) => {
                    return (
                        <p key={index}>
                            {par}
                        </p>
                    )
                })}
                <span>Posted at {date}, </span>
                <span>{author}</span>
            </div>
        </div>
    );
}

export default Blogpage;