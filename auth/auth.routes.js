import { Router } from "express";
import * as controller from "./controller.js";
import validate from "./validate.middleware.js";
import RegisterDto from "./register.dto.js";
import loginDto from "./login.dto.js";

const router = Router();

router.post("/signup", validate(RegisterDto), controller.register);
router.post("/login", validate(loginDto), controller.login);

export default router;
