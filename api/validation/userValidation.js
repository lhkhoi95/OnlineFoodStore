const Joi = require("@hapi/joi");

// REGISTER VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    name: Joi.string().min(6).required(),
    loginWithProvider: Joi.boolean().required(),
    address: Joi.string().min(1),
    phone: Joi.string().min(1),
    password: Joi.string().min(8).when("loginWithProvider", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
    avatar: Joi.string().min(1),
  });

  return schema.validate(data);
};

// LOGIN VALIDATION
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1),
    loginWithProvider: Joi.boolean().required(),
    password: Joi.string().min(8).when("loginWithProvider", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
    avatar: Joi.string().min(1),
  });

  return schema.validate(data);
};

// UPDATE VALIDATION
const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    loginWithProvider: Joi.boolean().required(),
    address: Joi.string().min(1),
    phone: Joi.string().min(1),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(8),
    avatar: Joi.string().min(1),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
