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
    const cart = await Cart.find({ user: userId });
    res.json(cart);
  } catch (error) {
    res.json({ message: error });
  }
});

// ADD ITEM TO CART OR UPDATE QUANTITY OF EXISTING ITEM
router.post("/", loginRequired, async (req, res) => {
  // VALIDATE PRODUCT ID
  const { error } = cartValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // EXTRACT userId FROM TOKEN
  const userId = helpers.getUserId(req.headers["auth-token"]);

  // CHECK IF PRODUCT EXISTS, SAVE PRODUCT ID TO AN ARRAY
  const products = req.body.products;

  products.forEach(async (product) => {
    const p = await Product.findById(product.productId);
    if (!p) {
      return res.status(400).send(`Invalid Product ID: ${product.productId}`);
    }
  });

  // CHECK IF CART EXISTS
  try {
    const existingCart = await Cart.findOne({ user: userId });
    if (existingCart) {
      const productsInCart = existingCart.products;

      // IF PRODUCT ALREADY IN CART, UPDATE THE QUANTITY
      for (const product of products) {
        const foundProductInCart = productsInCart.find(
          (itemInCart) => itemInCart.productId.toString() === product.productId
        );
        // UPDATE QUANTITY
        if (foundProductInCart) {
          foundProductInCart.quantity = product.quantity;
        } else {
          // IF PRODUCT NOT IN CART, ADD THE PRODUCT TO THE CART
          productsInCart.push({
            productId: product.productId,
            quantity: product.quantity,
          });
        }
      }

      // SAVE THE UPDATED CART
      await existingCart.save();

      res.send(existingCart);
    } else {
      // CREATE AND SAVE A NEW CART
      const cart = new Cart({
        user: userId,
        products: products,
      });

      try {
        const savedCart = await cart.save();
        res.json(savedCart);
      } catch (error) {
        res.json({ message: error });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// REMOVE ITEM IN CART

module.exports = router;
