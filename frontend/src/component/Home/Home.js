import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";

const Home = () => {
  
  const product = {
    name: "blue shirt",
    images: [{ url: "https://www.google.com/aclk?sa=l&ai=DChcSEwjnxY3YoYT9AhWZ6-MHHbK5BykYABAKGgJ5bQ&ase=2&sig=AOD64_2CKxXvlFuewxTS9zxhm7cgi0II9Q&ctype=5&q=&ved=2ahUKEwih5oPYoYT9AhVekIkEHafcDv4Q9aACKAB6BAgHEBg&adurl=" }],
    price: "$200",
    _id: "1234"
  };

  return (
    <Fragment>
      
          <div className="banner">
            <p>Welcome To Our Treasure Trove</p>
            <h1>SCROLL THROUGH THE AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            <Product product={product} />
          </div>

    </Fragment>
  );
};

export default Home;