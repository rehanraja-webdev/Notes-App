import express from "express";
import userAuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", userAuthController.Register);

router.post("/login", userAuthController.Login);

router.get("/logout", userAuthController.Logout);

router.get("/me", authMiddleware, userAuthController.getUser);

export default router;
