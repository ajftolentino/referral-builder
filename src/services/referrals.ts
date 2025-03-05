import { ERROR_MESSAGES } from 'appConstants';
import { config } from 'config';
import { getFailure } from 'helpers';
import { Referrals } from 'store';
import { Referral, RequestPayload, Response } from 'types';

import { callApi } from './base';

/**
 * Creates a new referral.
 * @param {RequestPayload<Referral>} data A RequestPayload object containing the referral data.
 * @returns {Promise<Response<Referrals>>} A promise that resolves to the API response containing referral data.
 *          If an error occurs, returns a failure response with an appropriate error message.
 */
export const createNewReferral = async (
  data: RequestPayload<Referral>
): Promise<Response<Referral>> => {
  const { payload: referralData } = data;
  try {
    const response = await callApi({
      url: `${config.apiUrl}api/referrals`,
      method: 'POST',
      data: referralData,
    });
    const { data } = (response ?? {}) as { [key: string]: any };
    return data as Response<Referral>;
  } catch (error) {
    console.log('[DEBUG] createNewReferral with error', error);
    return getFailure(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Deletes a selected referral.
 * @param {RequestPayload<string>} data A RequestPayload object containing the referral ID.
 * @returns {Promise<Response<Referrals>>} A promise that resolves to the API response containing a boolean data.
 *          If an error occurs, returns a failure response with an appropriate error message.
 */
export const deleteSelectedReferral = async (
  data: RequestPayload<string>
): Promise<Response<Referral>> => {
  const { payload: referralId } = data;
  try {
    const response = await callApi({
      url: `${config.apiUrl}api/referrals/${referralId}`,
      method: 'DELETE',
    });
    const { data } = (response ?? {}) as { [key: string]: any };
    return data as Response<Referral>;
  } catch (error) {
    console.log('[DEBUG] deleteSelectedReferral with error', error);
    return getFailure(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Fetches a single referral from the API.
 * @param {RequestPayload<string>} data A RequestPayload object containing the referral ID.
 * @returns {Promise<Response<Referrals>>} A promise that resolves to the API response containing referral data.
 *          If an error occurs, returns a failure response with an appropriate error message.
 */
export const fetchReferral = async (
  data: RequestPayload<string>
): Promise<Response<Referral | null>> => {
  const { payload: referralId } = data;
  try {
    if (!referralId) {
      return getFailure(ERROR_MESSAGES.INVALID_REQUEST);
    }
    const response = await callApi({
      url: `${config.apiUrl}api/referrals/${referralId}`,
    });
    const { data } = (response ?? {}) as { [key: string]: any };
    return data as Response<Referral | null>;
  } catch (error) {
    console.log('[DEBUG] fetchReferral with error', error);
    return getFailure(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Fetches a list of referrals from the API.
 * @returns {Promise<Response<Referrals>>} A promise that resolves to the API response containing referral data.
 *          If an error occurs, returns a failure response with an appropriate error message.
 */
export const fetchReferrals = async (): Promise<Response<Referrals>> => {
  try {
    const response = await callApi({
      url: `${config.apiUrl}api/referrals`,
    });
    const { data } = (response ?? {}) as { [key: string]: any };
    return data as Response<Referrals>;
  } catch (error) {
    console.log('[DEBUG] fetchReferrals with error', error);
    return getFailure(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Updates a selected referral.
 * @param {RequestPayload<Referral>} data A RequestPayload object containing the referral data.
 * @returns {Promise<Response<Referrals>>} A promise that resolves to the API response containing referral data.
 *          If an error occurs, returns a failure response with an appropriate error message.
 */
export const updateSelectedReferral = async (
  data: RequestPayload<Referral>
): Promise<Response<Referral>> => {
  const { payload: referralData } = data;
  try {
    const dataCopy: Partial<Referral> = { ...referralData };
    delete dataCopy.id;
    const response = await callApi({
      url: `${config.apiUrl}api/referrals/${referralData.id}`,
      method: 'PUT',
      data: dataCopy,
    });
    const { data } = (response ?? {}) as { [key: string]: any };
    return data as Response<Referral>;
  } catch (error) {
    console.log('[DEBUG] updateSelectedReferral with error', error);
    return getFailure(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
