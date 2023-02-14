import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";


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