import { RESPONSE_CODES } from 'appConstants';
import { Response } from 'types';

/**
 * Creates a failure response object with the given error message.
 * @param message - The error message to include in the response.
 * @returns An object of type Response<T> containing the failure code, message, and null data.
 */
export const getFailure = <T>(message: string) => {
  return {
    code: RESPONSE_CODES.FAILED,
    message,
    data: null,
  } as Response<T>;
};
