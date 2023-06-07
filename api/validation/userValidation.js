const Joi = require("@hapi/joi");

// REGISTER VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    address: Joi.string().min(1).required(),
    phone: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

// LOGIN VALIDATION
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

// UPDATE VALIDATION
const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    address: Joi.string().min(1),
    phone: Joi.string().min(1),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(8),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
