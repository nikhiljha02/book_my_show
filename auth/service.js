import {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../jwtToken/jwtToken.js";
import bcrypt from "bcryptjs";
import User from "./userSchema.js   ";

import * as validate from "./middleware.js";

const hashRefreshToken = async (token) => {
  return await bcrypt.hash(token, 10);
};
const registerService = async (req, res) => {
  // console.log(req.body);
  try {
    const { error, value } = validate.registerValidate.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // let hashPassword = await passwordHashing(value.password);
    const newUser = await User.create(value); // ← this returns the saved doc

    let AccessToken = generateAccessToken(newUser);
    let refreshToken = generateRefreshToken(newUser);

    res.cookie("AccessTokens", AccessToken, {
      httpOnly: true, // prevents JS access (important security)
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // prevents JS access (important security)
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    newUser.refreshToken = refreshToken;
    newUser.isVerified = true;

    await newUser.save();
    let responseUser = newUser.toObject();
    delete responseUser.password;
    delete responseUser.refreshToken;
    // newUser.AccessToken = token;
    return res.status(201).json({
      user: responseUser,
      AccessToken: AccessToken,
      refreshToken: refreshToken,
    }); // ← return it directly
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const loginService = async (req, res) => {
  try {
    const { error, value } = validate.loginValidate.validate(req.body);
    // console.log(value);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const loginUser = await User.findOne({ email }).select("+password");
    //check pass
    if (!loginUser) {
      return res.status(401).json({ status: 401, message: "User not Found" });
    }

    // console.log(password, loginUser.password);
    let userPass = await bcrypt.compare(password, loginUser.password);
    // console.log(userPass);
    if (!userPass) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    loginUser.isVerified = true;
    let AccessToken = generateAccessToken(loginUser);
    let refreshToken = generateRefreshToken(loginUser);
    let hashedRefreshToken = await hashRefreshToken(refreshToken);
    loginUser.refreshToken = hashedRefreshToken;
    await loginUser.save();
    let responseUser = loginUser.toObject();

    res.cookie("AccessTokens", AccessToken, {
      httpOnly: true, // prevents JS access (important security)
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // prevents JS access (important security)
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });
    // newUser.AccessToken = token;
    return res.status(201).json({
      user: responseUser,
      AccessToken: AccessToken,
      refreshToken: refreshToken,
    }); // ← return it directly
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { refreshToken: null },
      { returnDocument: "after" },
    );

    res.clearCookie("AccessTokens", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const authCheck = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Not verified" });
    }

    console.log("logged In");

    return res.status(200).json({ user: user.name, msg: "booked" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { registerService, loginService, logout, authCheck };
