import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrders = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [       
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },      // 1st column

    {                                  // 2nd column
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {        // in-built property that allows to set cellClassName to a color viz. greenColor/redColor 
        return params.getValue(params.id, "status") === "Delivered"     // This checks whether the status is 'Processing' or 'Delivered' and then applies the color accordingly
          ? "greenColor"
          : "redColor";
      },
    },
    {                            // 3rd column
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {                         // 4th column
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {                           // 5th column
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,      // other fields are sortable
      renderCell: (params) => {    // 'params' allows us to access any other field from the column (in the same row) by using the '.getValue' method
        return (       // this is basically for providing a link to each individual order 
          // We're sending the user to '/orders/:orderId' essentially
          <Link to={`/order/${params.getValue(params.id, "id")}`}>       
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,       // these are the "field"s from the objects in column array
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (

        <div className="myOrdersPage">

          {/* DataGrid basically helps in creating a table */}
          <DataGrid      
            rows={rows}    
            columns={columns}
            pageSize={10}      // max 10 orders on each page
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight    // the table automatically adjusts the height after 10 rows
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

        </div>

      )}

    </Fragment>
  );
};

export default MyOrders;