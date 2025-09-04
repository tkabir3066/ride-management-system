import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { RideController } from "./ride.controller";
import { checkDriverApprove } from "../../middlewares/checkdriverApprove";
import { checkDriverOnline } from "../../middlewares/checkOnline";
import { validateRequest } from "../../middlewares/validateRequest";
import { rideRequestValidationSchema } from "./ride.validation";

const router = Router();

router.get("/all-rides", checkAuth(Role.ADMIN), RideController.getAllRides);
router.get("/me", checkAuth(Role.RIDER), RideController.getRiderHistory);
router.get(
  "/available",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  checkDriverOnline,
  RideController.getAvailableRides
);

router.post(
  "/request",
  validateRequest(rideRequestValidationSchema),
  checkAuth(Role.RIDER),
  RideController.requestRide
);
router.patch(
  "/accept/:id",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  checkDriverOnline,
  RideController.acceptRide
);

router.patch(
  "/:id/status",
  checkAuth(Role.DRIVER),
  checkDriverApprove,
  checkDriverOnline,
  RideController.updateRideStatus
);

router.patch(
  "/cancel",
  checkAuth(Role.RIDER, Role.DRIVER),
  RideController.cancelRide
);

export const RideRoutes = router;
