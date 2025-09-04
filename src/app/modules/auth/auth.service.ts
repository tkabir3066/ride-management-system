import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import User from "../user/user.model";
import { IUser } from "../user/user.interface";
import {
  createNewAccessTokenWithRefreshToken,
  createUsersToken,
} from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";
import { Response } from "express";
import { envVars } from "../../config/env";

const registerUser = async (payload: IUser) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  const user = await User.create({
    email,
    password: hashedPassword,
    ...rest,
  });
  return user;
};
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

type TLoginPayload = Pick<IUser, "email" | "password">;

const login = async (res: Response, payload: TLoginPayload) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email }).select("+password");
  console.log(isUserExist?.password);
  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Password");
  }

  const { accessToken, refreshToken } = createUsersToken({
    _id: String(isUserExist._id),
    email: isUserExist.email,
    role: isUserExist.role,
  });
  setAuthCookie(res, {
    accessToken,
    refreshToken,
  });

  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};

export const AuthService = {
  registerUser,
  login,
  getNewAccessToken,
};
