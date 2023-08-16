const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const loginRequired = require("./verifyToken");
const helper = require("../helpers");
const { orderIdValidation } = require("../validation/orderValidation");

// GET ALL ORDERS
router.get("/", loginRequired, async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json(orders);
  } catch (error) {
    return res.json({ message: error });
  }
});

// GET A SPECIFIC ORDER
router.get("/:orderId", loginRequired, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    return res.json(order);
  } catch (error) {
    return res.json({ message: error });
  }
});

// CREATE AN ORDER
router.post("/", loginRequired, async (req, res) => {
  // VALIDATION
  const { error } = orderIdValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF PRODUCT EXISTS
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  if (!product) return res.status(400).send("Invalid Product ID");

  // EXTRACT userId FROM TOKEN
  const userId = helper.getUserId(req.headers["auth-token"]);

  const order = new Order({
    user: userId,
    product: req.body.productId,
  });

  try {
    const savedOrder = await order.save();
    return res.json(savedOrder);
  } catch (error) {
    return res.json({ message: error });
  }
});

// UPDATE AN ORDER
router.patch("/:orderId", loginRequired, async (req, res) => {
  // VALIDATION
  const { error } = orderIdValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF PRODUCT EXISTS
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  if (!product) return res.status(400).send("Invalid Product ID");

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        product: req.body.productId,
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(400).send("Invalid Order ID");

    return res.json(updatedOrder);
  } catch (error) {
    return res.json({ message: error });
  }
});

// DELETE AN ORDER
router.delete("/:orderId", loginRequired, async (req, res) => {
  try {
    const removedOrder = await Order.deleteOne({
      _id: req.params.orderId,
    });
    return res.json(removedOrder);
  } catch (error) {
    return res.json({ message: error });
  }
});

module.exports = router;
