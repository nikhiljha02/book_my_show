import Joi from "joi";
import BaseDTO from "./base.dto.js";
class RegisterDto extends BaseDTO {
  static schema = Joi.object({
    name: Joi.string().trim().min(4).max(50).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(8).max(12).required().messages({
      "string.min": "Password must be at least {#limit} characters",
      "string.max": "Password must not exceed {#limit} characters",
      "string.pattern.base":
        "Password must include 1 uppercase, 1 lowercase, 1 number, 1 special char (@$!%*?&)",
      "any.required": "Password is required",
    }),
    role: Joi.string().trim().valid("customer", "seller").default("customer"),
  });
}

export default RegisterDto;
