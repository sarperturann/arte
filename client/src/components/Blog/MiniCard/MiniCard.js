import React from 'react'
import './MiniCard.css'
import {
    Link
} from 'react-router-dom'

const MiniCard = (data) => {
    const { id, img, title, date } = data;
    return (
        <Link to={`/blog/${id}`} state={{ data }}>
            <div className='miniCard'>
                <img src={img} alt={title} />
                <div>
                    <h5>{title}</h5>
                    <span>{date}</span>
                </div>
            </div>
        </Link>
    )
}

export default MiniCard; 