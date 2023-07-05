function getTotal() {
  const cart: ProductsInCart[] =
    JSON.parse(localStorage.getItem("cart") || "null") || [];
  let sum = 0.0;

  cart.forEach((productInCart) => {
    sum += productInCart.price * productInCart.quantity;
  });

  return sum;
}

function setTotal(total: number) {
  localStorage.setItem("currentTotal", total.toString());
}

function getQuantity() {
  const cart: ProductsInCart[] =
    JSON.parse(localStorage.getItem("cart") || "null") || [];
  let productsInCart = 0;
  cart.forEach((product) => {
    productsInCart += product.quantity;
  });

  return productsInCart;
}

function addProductToCart(product: Product) {
  // If cart is empty, create a new cart and add the product to that cart
  const productToSave = {
    id: product._id,
    price: product.price,
    quantity: 1,
  };
  const cart: ProductsInCart[] = JSON.parse(
    localStorage.getItem("cart") || "null"
  );

  if (cart === null) {
    const newCart: ProductsInCart[] = [];
    newCart.push(productToSave);
    localStorage.setItem("cart", JSON.stringify(newCart));
  } else {
    // Check if product is already in cart
    const index = cart.findIndex((item) => item.id === product._id);
    if (index === -1) {
      cart.push(productToSave);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

function getProducts() {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart;
}

export { getTotal, setTotal, addProductToCart, getProducts, getQuantity };
