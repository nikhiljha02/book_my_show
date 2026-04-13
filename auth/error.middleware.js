import APiError from "./api-error.js";
const errorHandler = (err, req, res, next) => {
  console.error(err); // optional log

  // If it's your custom error
  if (err instanceof APiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Unknown error fallback
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
