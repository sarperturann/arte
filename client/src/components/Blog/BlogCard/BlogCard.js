import React from 'react'
import './BlogCard.css'
import {
    Link
} from 'react-router-dom'

const BlogCard = (data) => {
    const { img, title, description, id } = data;
    return (
        <>
            <div className='blogCard'>
                <img className='thumbnail' src={img} alt={title} />
                <h4>{title}</h4>
                <p>{description.slice(0, 148) + "..."}</p>
                <Link to={`/blog/${id}`} state={{ data }}>
                    <button>Read More</button>
                </Link>
            </div>
        </>
    );
}

export default BlogCard;