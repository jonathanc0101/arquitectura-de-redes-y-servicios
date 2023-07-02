import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", async (req,res,next) =>
  {
    const loggedIn = await userController.loginUser(req,res,next);

  }
);
router.post("/register", userController.registerUser);

export default router;
