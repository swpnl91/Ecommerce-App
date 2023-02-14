import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(  // tries to find whether the product is already added in the cart
        (i) => i.product === item.product
      );

      if (isItemExist) {     // if it's then the existing product is updated
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {    // if not then it is added as a new item in the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    

    default:
      return state;
  }
};