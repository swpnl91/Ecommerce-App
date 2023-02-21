import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  
  

  return (
    <div className="dashboard">
      
      

      <div className="dashboardContainer">
        
        <div className="dashboardSummary">
          
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          
          <div className="dashboardSummaryBox2">
            
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>

        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;