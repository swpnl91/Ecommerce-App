import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  
  
  
  return (
    <Fragment>
      

        <Fragment>

          

          <div className="orderDetailsPage">
            
            <div className="orderDetailsContainer">
              
              

            </div>

            <div className="orderDetailsCartItems">
              

            </div>

          </div>

        </Fragment>
     
    </Fragment>
  );
};

export default OrderDetails;