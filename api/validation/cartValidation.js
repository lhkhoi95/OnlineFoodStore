const Joi = require("@hapi/joi");
const Product = require("../models/Product");

// VALIDATE ITEM
const cartValidation = async (data) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().length(24).required(),
          quantity: Joi.number().min(1).required(),
          price: Joi.number().min(0.0).required(),
        })
      )
      .min(1)
      .required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return { message: error.details[0].message };
  }

  // CHECK IF PRODUCT IDS EXIST IN DATABASE
  const products = data.products;
  const productValidationResults = await Promise.all(
    products.map(async (product) => {
      const existingProduct = await Product.findById(product.productId);
      if (!existingProduct) {
        return { message: `Invalid Product ID: ${product.productId}` };
      }
      return null; // Indicates successful validation
    })
  );

  const invalidProduct = productValidationResults.find(
    (result) => result !== null
  );
  if (invalidProduct) {
    return invalidProduct;
  }

  // All products are valid
  return null;
};

module.exports.cartValidation = cartValidation;
