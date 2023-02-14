import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";


const Cart = ({ history }) => {
  
  return (
    <Fragment>
      
        <Fragment>
          <div className="cartPage">
            
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            
                <div className="cartContainer" key={item.product}>
                  
                </div>
              

          </div>
        </Fragment>
      
    </Fragment>
  );
};

export default Cart;