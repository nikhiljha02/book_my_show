import APiError from "./api-error.js";

const validate = (DtoClass) => {
  return (req, res, next) => {
    const { errors, value } = DtoClass.Validate(req.body);
    if (errors) {
      throw APiError.badRequest(errors.join("; "));
    }
    req.body = value;
    next();
  };
};

export default validate;
