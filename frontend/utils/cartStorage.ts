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

    const index = cart.findIndex((prod) => prod.id === productId);
    if (index === -1) return 0;

    return cart[index].quantity;
  } catch (error) {
    // console.log(error);
    return 0;
  }

}

function addProductToCart(product: ProductInCart) {
  try {
    // If cart is empty, create a new cart and add the product to that cart
    const productToSave = {
      id: product.id,
      price: product.price,
      quantity: 1,
    };
    const cart: ProductInCart[] = JSON.parse(
      localStorage.getItem("cart") || "null"
    );

    if (cart === null) {
      const newCart: ProductInCart[] = [];
      newCart.push(productToSave);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      // Check if product is already in cart
      const index = cart.findIndex((item) => item.id === product.id);
      if (index === -1) {
        // If not, add as a new product
        cart.push(productToSave);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        // Update quantity
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  } catch (error) {
    // console.log(error)
  }

}

function subtractProductFromCart(product: ProductInCart) {
  try {
    const cart: ProductInCart[] = JSON.parse(
      localStorage.getItem("cart") || "null"
    );

    if (cart === null) return

    const index = cart.findIndex((item) => item.id === product.id);
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

function getProductsInCart() {
  let products: ProductInCart[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = getQuantity();
  const currentTotal = getTotal();
  const allProducts: {
    products: ProductInCart[],
    cartCount: number,
    currentTotal: number,
  } = { products, cartCount, currentTotal }

  return allProducts;
}

export { getTotal, addProductToCart, subtractProductFromCart, getProductsInCart, getQuantity, getQuantityById };
