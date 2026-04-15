import { Router } from "express";
import * as services from "./service.js";
import authMiddle from "./authMiddleware.js";

const router = Router();

router.post("/signup", services.registerService);
router.post("/login", services.loginService);
router.post("/logout", services.logout);
router.post("/authCheck", authMiddle, services.authCheck);
export default router;
