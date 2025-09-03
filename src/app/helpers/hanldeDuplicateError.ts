/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from "../interfaces/errorTypes";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: `${matchedArray[1]} already exist`,
  };
};
