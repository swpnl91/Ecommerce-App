import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";


const ProductDetails = ({ match }) => {     /* match is received as a prop (default prop) Google 'match' object/parameter in react*/
  
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(match.params.id));       /* we have 'req.param.id in backend in front end we have 'match.params.id' and it's received as a prop */
  }, [dispatch, match.params.id, error]);


  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
          {product.images &&
            product.images.map((item, i) => (      /* 'i' is the index and the second argument that .map() can take */
              <img  
                className="CarouselImage"
                key={i}       /* 'i' is used as 'key' which is necessary with .map() */
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
          </Carousel>
        </div>

        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>

        <div className="detailsBlock-2">
           {/* <Rating {...options} /> */}
          <span className="detailsBlock-2-span">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>

        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button
              disabled={product.Stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>

          <p>
            Status:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description : <p>{product.description}</p>
        </div>

      </div>
    </Fragment>
  );
};

export default ProductDetails;