import express from "express";
import userAuthController from "../controllers/userAuth.controller.js";

const router = express.Router();

router.post("/register", userAuthController.Register);

router.post("/login", userAuthController.Login);

router.get("/logout", userAuthController.Logout);

export default router;
