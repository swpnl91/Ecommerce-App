import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import "./Home.css";




const Product = ({ product }) => {
  
  const options = {
    edit: false,     // makes the stars uneditable
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",    // basically the number of stars that are given to a particular product are shown in active colors
    size: window.innerWidth < 600 ? 20 : 25,       // added a condition for the size to take care of responsiveness
    value: 2.5,     // The avg number of stars given to a product
    isHalf: true    // whether to show a colored half star or not
  };

  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /><span className="productCardSpan">(256 Reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
};

export default Product;