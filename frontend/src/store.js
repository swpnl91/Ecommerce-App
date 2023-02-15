import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

import {

  forgotPasswordReducer,
  profileReducer,

  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";



const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")       // if there's data stored in the local storage then uses that as the initial state otherwise keeps it empty
      ? JSON.parse(localStorage.getItem("cartItems"))    // we use JSON.parse here and JSON.stringify in cartAction.js
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")     // same as above
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},   
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;