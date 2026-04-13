import * as authServices from "./authService.js";
import ApiResponse from "./api-response.js";

const register = async (req, res) => {
  //something
  const user = await authServices.RegisterService(req.body);
  ApiResponse.created(res, "Registration successful", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authServices.Login(
    req.body,
  );
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   maxAge: 7 * 20 * 60 * 60 * 1000,
  // });
  ApiResponse.ok(res, "SuccessFully Login", {
    user,
    accessToken,
    refreshToken,
  });
};

export { register, login };
