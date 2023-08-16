function getTotal() {
  const cart: ProductInCart[] =
    JSON.parse(localStorage.getItem("cart") || "null") || [];
  let sum = 0.0;

  cart.forEach((productInCart) => {
    sum += productInCart.price * productInCart.quantity;
  });

  return sum;
}

function getQuantity() {
  const cart: ProductInCart[] =
    JSON.parse(localStorage.getItem("cart") || "null") || [];
  let productsInCart = 0;
  cart.forEach((product) => {
    productsInCart += product.quantity;
  });
  return productsInCart;
}

function getQuantityById(productId: string) {
  try {
    const cart: ProductInCart[] =
      JSON.parse(localStorage.getItem("cart") || "null") || [];

    const index = cart.findIndex((prod) => prod.productId === productId);
    if (index === -1) return 0;

    return cart[index].quantity;
  } catch (error) {
    console.log(error);
    return 0;
  }

}

export function addProductToCart(product: ProductInCart) {
  try {
    // If cart is empty, create a new cart and add the product to that cart
    const cart: ProductInCart[] = JSON.parse(
      localStorage.getItem("cart") || "null"
    );

    if (cart === null) {
      const newCart: ProductInCart[] = [];
      newCart.push(product);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      // Check if product is already in cart
      const index = cart.findIndex((item) => item.productId === product.productId);
      if (index === -1) {
        // If not, add as a new product
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        // Update quantity
        cart[index].quantity += product.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        // Delete the product from the cart if quantity is going to be 0.
        if (cart[index].quantity === 0) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
  } catch (error) {
    console.log(error)
  }

}

function subtractProductFromCart(product: ProductInCart) {
  try {
    const cart: ProductInCart[] = JSON.parse(
      localStorage.getItem("cart") || "null"
    );

    if (cart === null) return

    const index = cart.findIndex((item) => item.productId === product.productId);
    if (index === -1) return
    // Update quantity
    const quantity = cart[index].quantity;
    if (quantity === 1) {
      // Remove the product from the cart if quantity is going to be 0.
      cart.splice(index, 1);
    } else {
      // Subtract 1 from quantity
      cart[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    // console.log(error);
  }
}

export function setLocalCart(cart: Cart) {
  localStorage.setItem("cart", JSON.stringify(cart.products));
}


export function getLocalCart() {
  if (typeof window !== 'undefined') {
    let products: ProductInCart[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (products.length === 0) return null;
    const cartCount = getQuantity();
    const currentTotal = getTotal();
    const allProducts: Cart = { products, cartCount, currentTotal }

    return allProducts;
  }

  return null;
}

export function clearLocalCart() {
  localStorage.removeItem("cart");
}

export { getTotal, subtractProductFromCart, getQuantity, getQuantityById };
