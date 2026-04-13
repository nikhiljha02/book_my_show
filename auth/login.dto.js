import Joi from "joi";
import BaseDTO from "./base.dto.js";

class loginDto extends BaseDTO {
  static schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(8).max(12).required(),
  });
}

export default loginDto;
