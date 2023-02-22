import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";



const ProcessOrder = ({ history, match }) => {
  

  return (
    <Fragment>
      


      <div className="dashboard">
        
      </div>

    </Fragment>
  );
};

export default ProcessOrder;