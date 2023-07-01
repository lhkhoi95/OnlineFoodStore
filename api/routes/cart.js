const router = require("express").Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const loginRequired = require("./verifyToken");
const helpers = require("../helpers");
const { cartValidation } = require("../validation/cartValidation");
const { exist } = require("@hapi/joi");

// VIEW ITEMS IN CART
router.get("/", loginRequired, async (req, res) => {
  try {
    // EXTRACT userId FROM TOKEN
    const userId = helpers.getUserId(req.headers["auth-token"]);
    const cart = await Cart.findOne({ user: userId });
    return res.json(cart);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// ADD ITEM TO CART OR UPDATE QUANTITY OF EXISTING ITEM
router.post("/", loginRequired, async (req, res) => {
  try {
    // VALIDATE PRODUCT ID
    const error = await cartValidation(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    // EXTRACT userId FROM TOKEN
    const userId = helpers.getUserId(req.headers["auth-token"]);

    // CHECK IF CART EXISTS
    let existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
      // CART EXISTS, UPDATE PRODUCTS' QUANTITY
      const productsInCart = existingCart.products;

      for (const product of req.body.products) {
        const foundProductInCart = productsInCart.find(
          (itemInCart) => itemInCart.productId.toString() === product.productId
        );

        if (foundProductInCart) {
          foundProductInCart.quantity = product.quantity;
        } else {
          productsInCart.push({
            productId: product.productId,
            quantity: product.quantity,
          });
        }
      }

      await existingCart.save();
      return res.send(existingCart);
    } else {
      // CART DOES NOT EXIST, CREATE A NEW CART
      const cart = new Cart({
        user: userId,
        products: req.body.products,
      });

      const savedCart = await cart.save();
      return res.json(savedCart);
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// REMOVE ITEM IN CART
router.delete("/removeProduct/:productId", loginRequired, async (req, res) => {
  try {
    const productIdToRemove = req.params.productId;
    // EXTRACT userId FROM TOKEN
    const userId = helpers.getUserId(req.headers["auth-token"]);
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(400).send("Cart Does Not Exist");

    // REMOVE PRODUCT THAT MATCHES THE PRODUCT ID IN THE CART
    await cart.products.pull({ productId: productIdToRemove });
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId });
    return res.json(updatedCart);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// EMPTY CART
router.delete("/", async (req, res) => {
  try {
    // EXTRACT userId FROM TOKEN
    const userId = helpers.getUserId(req.headers["auth-token"]);
    const cartToDelete = await Cart.deleteOne({ user: userId });
    if (cartToDelete) return res.send({ message: "Cart is deleted" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

module.exports = router;
