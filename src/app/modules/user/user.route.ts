import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { UpdateUserZodSchema } from "./user.validation";

const router = Router();

router.get("/all-users", checkAuth(Role.ADMIN), UserController.getAllUsers);
router.patch(
  "/update-user/:id",
  validateRequest(UpdateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);
router.patch("/block/:id", checkAuth(Role.ADMIN), UserController.blockUser);
router.patch("/unblock/:id", checkAuth(Role.ADMIN), UserController.unblockUser);

export const usersRoutes = router;
