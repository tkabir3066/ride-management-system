import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CreateUserZodSchema } from "../user/user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(CreateUserZodSchema),
  AuthController.registerUser
);
router.post("/refresh-token", AuthController.getNewAccessTokenByRefreshToken);
router.post("/logout", AuthController.logout);
router.post("/login", AuthController.login);

export const AuthRoutes = router;
