const Joi = require("@hapi/joi");

// VALIDATE ITEM
const cartValidation = (data) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().min(1).required(),
          quantity: Joi.number().min(1).required(),
        })
      )
      .min(1)
      .required(),
  });

  return schema.validate(data);
};

module.exports.cartValidation = cartValidation;
