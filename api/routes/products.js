const router = require("express").Router();
const Product = require("../models/Product");
const loginRequired = require("./verifyToken");
const {
  createValidation,
  updateValidation,
} = require("../validation/productValidation");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET A SPECIFIC PRODUCT
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});

// CREATE A PRODUCT
router.post("/", loginRequired, async (req, res) => {
  // VALIDATION
  const { error } = createValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF USER EXISTS

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    image: req.body.image,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE A PRODUCT
router.patch("/:productId", loginRequired, async (req, res) => {
  // VALIDATION
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      req.body,
      { new: true }
    );

    if (!updatedProduct) return res.status(400).send("Product not found");

    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE A PRODUCT
router.delete("/:productId", loginRequired, async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.productId,
    });
    res.json(removedProduct);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
