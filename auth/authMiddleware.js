import { verifyAccessToken, verifyRefreshToken } from "../jwtToken/jwtToken.js";

const authMiddle = async (req, res, next) => {
  try {
    const token = req.cookies?.AccessTokens;
    if (!token) {
      return res.status(401).json({ status: 401, message: "No token" });
    }

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    return next(); // ✅ return added
  } catch (err) {
    return res
      .status(401)
      .json({ status: 401, message: err.message || "Invalid token" });
  }
};
export default authMiddle;
