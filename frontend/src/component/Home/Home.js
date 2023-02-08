import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const Home = () => {
  
  const product = {
    name: "blue shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
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