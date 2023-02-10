import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";


import { useAlert } from "react-alert";



const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const {
    products,
    loading,
    error,
    productsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword));
  }, [dispatch, keyword, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
          ))}
        </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;