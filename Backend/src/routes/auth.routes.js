import express from "express";
import userAuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", userAuthController.Register);

router.post("/login", userAuthController.Login);

router.get("/logout", userAuthController.Logout);

router.get("/me", userAuthController.getUser);

export default router;
