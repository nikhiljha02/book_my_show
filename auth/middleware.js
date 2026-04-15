import Joi from "joi";

let registerValidate = Joi.object({
  name: Joi.string().min(2).max(128).required(),
  email: Joi.string().lowercase().min(12).max(256).required(),
  password: Joi.string().min(8).required(),
});
let loginValidate = Joi.object({
  email: Joi.string().lowercase().min(12).max(256).required(),
  password: Joi.string().min(8).required(),
});

export { registerValidate, loginValidate };
