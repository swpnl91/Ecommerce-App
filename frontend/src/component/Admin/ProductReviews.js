import React, { Fragment, useEffect, useState } from "react";
import "./ProductReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";



const ProductReviews = ({ history }) => {
  
  

  return (
    <Fragment>
      


      <div className="dashboard">
        
        <SideBar />
        <div className="productReviewsContainer">
          
        </div>

      </div>

    </Fragment>
  );
};

export default ProductReviews;