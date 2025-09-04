/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RideService } from "./ride.service";
import { StatusCodes } from "http-status-codes";

const getAllRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RideService.getAllRides();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Rides Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getRiderHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.id;
    const result = await RideService.getRiderHistory(riderId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My Rides History Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getAvailableRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RideService.getAvailableRides();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Available Rides History Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const requestRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.id);
    const riderId = req.id;
    const result = await RideService.requestRide(req.body, riderId);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Ride requested successfully",
      data: result,
    });
  }
);

const acceptRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.id;
    const result = await RideService.acceptRide(req.params.id, driverId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Ride accepted successfully",
      data: result,
    });
  }
);

const updateRideStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.id;
    const result = await RideService.updateRideStatus(req.params.id, driverId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Ride status updated successfully",
      data: result,
    });
  }
);

const cancelRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.id;
    const result = await RideService.cancelRide(userid);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Ride cancelled successfully",
      data: result,
    });
  }
);

export const RideController = {
  getAllRides,
  getRiderHistory,
  getAvailableRides,
  requestRide,
  acceptRide,
  cancelRide,
  updateRideStatus,
};
