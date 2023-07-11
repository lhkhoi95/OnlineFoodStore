import { addProductToCart, getProductsInCart, subtractProductFromCart } from "@/utils/cartStorage";
import { configureStore } from "@reduxjs/toolkit";


const initialState = getProductsInCart();

const reducer = (state: any = initialState, action: any) => {
  const productObj: ProductInCart = action.payload;
  // const allProducts = getProductsInCart().products;
  // console.log(allProducts)
  switch (action.type) {
    case "INCREMENT_CART_COUNT":
      // add new product to localStorage
      addProductToCart(productObj);
      return {
        products: getProductsInCart()?.products,
        cartCount: state.cartCount + productObj.quantity,
        currentTotal: state.currentTotal + productObj.price,
      };
    case "DECREMENT_CART_COUNT":
      // subtract new product from localStorage
      subtractProductFromCart(productObj);
      return {
        products: getProductsInCart()?.products,
        cartCount: state.cartCount - productObj.quantity,
        currentTotal: state.currentTotal - productObj.price,
      };
    default:
      return state;
  }
};


export const store = configureStore({
  reducer,
});