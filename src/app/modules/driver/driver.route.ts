import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AddDriverInfoZodSchema } from "./driver.validation";
import { checkDriverApprove } from "../../middlewares/checkdriverApprove";

const router = Router();

router.post(
  "/add-information",
  validateRequest(AddDriverInfoZodSchema),
  checkAuth(Role.DRIVER),
  DriverController.addDriverInfo
);

router.get(
  "/my-earning",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  DriverController.getEarnings
);

router.get(
  "/completed",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  DriverController.getCompletedRides
);

router.patch(
  "/availability/online",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  DriverController.updateAvailabilityToOnline
);
router.patch(
  "/availability/offline",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  DriverController.updateAvailabilityToOffline
);

// admin routes
router.get(
  "/all-drivers",
  checkAuth(Role.ADMIN),
  DriverController.getAllDrivers
);
router.patch(
  "/approve/:id",
  checkAuth(Role.ADMIN),
  DriverController.approveDriver
);
router.patch(
  "/suspend/:id",
  checkAuth(Role.ADMIN),
  DriverController.suspendDriver
);

export const DriverRoutes = router;
