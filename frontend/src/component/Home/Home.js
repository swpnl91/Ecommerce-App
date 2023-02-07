import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";

const Home = () => {
  
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

    </Fragment>
  );
};

export default Home;