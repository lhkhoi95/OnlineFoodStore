import { calculateCartCount, calculateCartTotal } from "@/app/helpers/cart";
import { clearDBCart, updateDBCart } from "@/lib/cart";

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
        // if (cart[index].quantity === 0) {
        //   cart.splice(index, 1);
        //   localStorage.setItem("cart", JSON.stringify(cart));
        // }
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

export async function mergeCarts(localCart: Cart | null, dbCart: Cart, user: NextAuthUser, isAdding: boolean) {
  // If there is a local cart, merge with database cart
  if (localCart && localCart.products.length > 0) {
    console.log("THERE ARE LOCAL CART and DB CART, MERGING...");
    localCart.products.forEach((localProduct) => {
      const index = dbCart.products.findIndex(p => p.productId === localProduct.productId);
      if (index === -1) {
        // Add new product 
        dbCart.products.push(localProduct);
      } else {
        // Update quantity
        let newQty: number = 0;
        if (isAdding) {
          newQty = Math.max(dbCart.products[index].quantity, localProduct.quantity);
        } else {
          newQty = Math.min(dbCart.products[index].quantity, localProduct.quantity);
        }

        if (newQty > 0) {
          dbCart.products[index].quantity = newQty;
        } else {
          // Remove product
          dbCart.products.splice(index, 1);
        }
      }
    });
    // Recalculate cart totals
    dbCart.cartCount = calculateCartCount(dbCart.products);
    dbCart.currentTotal = calculateCartTotal(dbCart.products);
    try {
      setLocalAndDbCart(dbCart, user);

      return dbCart;
    } catch (err) {
      console.error('Error updating cart', err);
      throw new Error("Error updating cart");
    }
  } else {
    // If no local cart, return database cart
    return dbCart;
  }
}

export async function setLocalAndDbCart(cart: Cart, user: NextAuthUser) {
  // Clear local cart  
  clearLocalCart();
  // Set new local cart
  setLocalCart(cart);
  try {
    // Clear database cart
    await clearDBCart(user.accessToken);
    // Update database
    await updateDBCart({
      products: cart.products,
      user: user,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error setting local and database carts");
  }

}

export function isSameCart(localCart: Cart | null, dbCart: Cart) {
  if (localCart?.products.length !== dbCart.products.length) return false;
  for (let i = 0; i < localCart.products.length; i++) {
    if (localCart.products[i].productId !== dbCart.products[i].productId) return false;
    if (localCart.products[i].quantity !== dbCart.products[i].quantity) return false;
  }
  return true;
}

export { getTotal, subtractProductFromCart, getQuantity, getQuantityById };
