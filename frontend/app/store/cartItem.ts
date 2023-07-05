import { getQuantity, getTotal } from "@/utils/cartStorage";
import { configureStore } from "@reduxjs/toolkit";

const reducer = (state: RootState = { cartCount: getQuantity(), currentTotal: getTotal() }, action: CartActionTypes) => {
  switch (action.type) {

    case "INCREMENT_CART_COUNT":
      return {
        ...state,
        cartCount: state.cartCount + action.payload.quantity,
        currentTotal: state.currentTotal + action.payload.price,
      };
    case "DECREMENT_CART_COUNT":
      return {
        ...state,
        cartCount: state.cartCount - action.payload.quantity,
        currentTotal: state.currentTotal + action.payload.price,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});
