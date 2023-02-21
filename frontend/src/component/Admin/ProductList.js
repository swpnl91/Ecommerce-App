import React, { Fragment, useEffect } from "react";
import "./ProductList.css";


const ProductList = ({ history }) => {
  

  return (
    <Fragment>
      

      <div className="dashboard">
        
        <SideBar />
        
        <div className="productListContainer">
          
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />

        </div>

      </div>

    </Fragment>
  );
};

export default ProductList;