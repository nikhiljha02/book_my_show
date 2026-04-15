import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET);
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
