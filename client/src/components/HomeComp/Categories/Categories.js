import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate()
  const myData = [
    {
      image:
        "https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/category/category1_cyau86.jpg",
      title: "Women Collection",
      alt: "category1",
    },
    {
      image:
        "https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/category/category2_u3iqzo.jpg",
      title: "Men Collection",
      alt: "category2",
    },
    {
      image:
        "https://res.cloudinary.com/inovatormatin/image/upload/v1653646901/eway/category/category3_mu1u1m.jpg",
      title: "Accessories",
      alt: "category3",
    },
  ];
  const clickhandler = (value) => {
    navigate('/shop', {
      state: {
        category: value
      }
    })
  }
  return (
    <section className="categories">
      {myData.map((card, index) => (
        <div className="Card" key={index} onClick={() => clickhandler(card.title)}>
          <img className="CardImg" src={card.image} alt={card.alt} />
          <div className="Cardtext">
            <h3>{card.title}</h3>
            <button>Shop Now</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;
