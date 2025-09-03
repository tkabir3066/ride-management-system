import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../utils/sendResponse";
import { httpMessages } from "../constants/httpMessages";
import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: httpMessages.NOT_FOUND,
    data: null,
  });
};
