import crypto from "crypto";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateRefreshToken,
  generateResetToken,
} from "./jwt.utils.js";
import bcrypt from "bcryptjs";
import APiError from "./api-error.js";
import chaiUser from "./userSchema.js";

const hashTokenProcess = (token) => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  return { rawToken, hashToken };
};

//continue from here

const RegisterService = async ({ name, email, password }) => {
  const existingUser = await chaiUser.findOne({ email });
  if (existingUser)
    throw APiError.conflict("User Already registered with this email");

  const userRegister = await chaiUser.create({
    name,
    email,
    password,
  });

  const userObj = userRegister.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

const Login = async ({ email, password }) => {
  console.log(email);
  const loginUser = await chaiUser.findOne({ email }).select("+password");
  console.log(loginUser);
  if (!loginUser)
    throw APiError.unAuthorized("User not Found check email or password");

  console.log(password, loginUser.password);
  let isCorrectPass = bcrypt.compare(password, loginUser.password);

  loginUser.iseVerified = true;

  if (!isCorrectPass) throw APiError.unAuthorized("Invalid Credentials");

  const accessToken = generateAccessToken({
    id: loginUser._id,
    role: loginUser.role,
  });
  const refreshToken = generateRefreshToken({ id: loginUser._id });

  const { rawToken, hashToken } = hashTokenProcess(refreshToken);
  loginUser.refreshToken = hashToken;
  await loginUser.save({ validateBeforeSave: false });
  const userObject = loginUser.toObject();
  delete userObject.password;
  delete userObject.refreshToken;

  return { user: userObject, accessToken, refreshToken };
};

export { RegisterService, Login };
