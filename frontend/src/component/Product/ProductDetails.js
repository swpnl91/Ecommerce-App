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
      </div>
    </Fragment>
  );
};

export default ProductDetails;