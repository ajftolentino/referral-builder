import { PayloadAction } from '@reduxjs/toolkit';
import { ERROR_MESSAGES, RESPONSE_CODES } from 'appConstants';
import { call, put } from 'redux-saga/effects';
import {
  createNewReferral,
  deleteSelectedReferral,
  fetchReferral,
  fetchReferrals,
  updateSelectedReferral,
} from 'services';
import { Referrals, referralsActions } from 'store';
import { Referral, Response } from 'types';

/**
 * Saga generator function that creates a new referral from the supplied referral data.
 * Dispatches actions to update the Redux store with the created referral.
 *
 * @param {PayloadAction<Referral>} data - A Redux action containing the referral data.
 * @returns {Response<Referral> | null} The API response containing referrals on success, or null on failure.
 */
export function* createReferral(data: PayloadAction<Referral>) {
  const { payload } = data;

  try {
    yield put(referralsActions.request());

    const response: Response<Referral | null> = yield call(createNewReferral, {
      payload,
    });
    const { code, data } = response;
    if (code === RESPONSE_CODES.SUCCESS && !!data && typeof data === 'object') {
      const referral = data as Referral;
      if (!referral?.id) {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_CREATION_FAILED)
        );
        return;
      }
      yield put(referralsActions.addCreatedReferral(data as Referral));
      return response;
    }

    const { message } = response;
    if (!data) {
      if (message !== 'Success') {
        yield put(referralsActions.failure(message));
      } else {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_CREATION_FAILED)
        );
      }
    }
    return response;
  } catch (error) {
    yield put(referralsActions.failure(ERROR_MESSAGES.UNKNOWN_ERROR));
    console.log('[DEBUG:SAGAS] createReferral', error);
    return null;
  }
}

/**
 * Saga generator function that deletes a referral.
 * Dispatches actions to let user know that referral is successfully deleted.
 *
 * @param {PayloadAction<string>} data - A Redux action containing the referralID.
 * @returns {Response<Referral> | null} The API response containing referrals on success, or null on failure.
 */
export function* deleteReferral(data: PayloadAction<string>) {
  const { payload } = data;

  try {
    yield put(referralsActions.request());

    const response: Response<Referral | null> = yield call(
      deleteSelectedReferral,
      {
        payload,
      }
    );
    const { code, data } = response;
    if (
      code === RESPONSE_CODES.SUCCESS &&
      !!data &&
      typeof data === 'boolean'
    ) {
      yield put(referralsActions.failure(response.message));
      yield put(referralsActions.getReferrals());
      return response;
    }

    const { message } = response;
    if (!data) {
      if (message !== 'Success') {
        yield put(referralsActions.failure(message));
      } else {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_DELETION_FAILED)
        );
      }
    }
    return response;
  } catch (error) {
    yield put(referralsActions.failure(ERROR_MESSAGES.UNKNOWN_ERROR));
    console.log('[DEBUG:SAGAS] deleteReferral', error);
    return null;
  }
}

/**
 * Saga generator function that fetches a referral, given a referral ID.
 * Dispatches actions to update the Redux store with the retrieved referrals.
 *
 * @param {PayloadAction<string>} data - A Redux action containing the referral ID.
 * @returns {Response<Referral> | null} The API response containing referrals on success, or null on failure.
 */
export function* getReferral(data: PayloadAction<string>) {
  const { payload } = data;

  try {
    yield put(referralsActions.request());

    const response: Response<Referral | null> = yield call(fetchReferral, {
      payload,
    });
    const { code, data } = response;
    if (code === RESPONSE_CODES.SUCCESS && !!data && typeof data === 'object') {
      yield put(referralsActions.selectReferral(data as Referral));
      return response;
    }

    const { message } = response;
    if (!data) {
      if (message !== 'Success') {
        yield put(referralsActions.failure(message));
      } else {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_RETRIEVAL_FAILED)
        );
      }
    }
    return response;
  } catch (error) {
    yield put(referralsActions.failure(ERROR_MESSAGES.UNKNOWN_ERROR));
    console.log('[DEBUG:SAGAS] getReferral', error);
    return null;
  }
}

/**
 * Saga generator function that fetches a list of referrals.
 * Dispatches actions to update the Redux store with the retrieved referrals.
 *
 * @yields Dispatches Redux actions to handle API request, response, and errors.
 * @returns {Response<Referral> | null} The API response containing referrals on success, or null on failure.
 */
export function* getReferrals() {
  try {
    yield put(referralsActions.request());

    const response: Response<Referrals> = yield call(fetchReferrals);
    const { code, data } = response;
    if (code === RESPONSE_CODES.SUCCESS && !!data && typeof data === 'object') {
      const referrals = data as Referrals;
      yield put(referralsActions.setReferrals(referrals));
      return response;
    }

    const { message } = response;
    if (!data) {
      if (message !== 'Success') {
        yield put(referralsActions.failure(message));
      } else {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.EMPTY_SEARCH_RESULTS)
        );
      }
    }
    return response;
  } catch (error) {
    yield put(referralsActions.failure(ERROR_MESSAGES.UNKNOWN_ERROR));
    console.log('[DEBUG:SAGAS] getReferrals', error);
    return null;
  }
}

/**
 * Saga generator function that updates a selected referral with the supplied referral data.
 * Dispatches actions to update the Redux store with the updated referral.
 *
 * @param {PayloadAction<Referral>} data - A Redux action containing the referral data.
 * @returns {Response<Referral> | null} The API response containing referrals on success, or null on failure.
 */
export function* updateReferral(data: PayloadAction<Referral>) {
  const { payload } = data;

  try {
    yield put(referralsActions.request());

    const response: Response<Referral | null> = yield call(
      updateSelectedReferral,
      {
        payload,
      }
    );
    const { code, data } = response;
    if (code === RESPONSE_CODES.SUCCESS && !!data && typeof data === 'object') {
      const referral = data as Referral;
      if (!referral?.id || referral?.id !== payload.id) {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_CREATION_FAILED)
        );
        return;
      }
      yield put(referralsActions.updateSelectedReferral(data as Referral));
      return response;
    }

    const { message } = response;
    if (!data) {
      if (message !== 'Success') {
        yield put(referralsActions.failure(message));
      } else {
        yield put(
          referralsActions.failure(ERROR_MESSAGES.REFERRAL_UPDATE_FAILED)
        );
      }
    }
    return response;
  } catch (error) {
    yield put(referralsActions.failure(ERROR_MESSAGES.UNKNOWN_ERROR));
    console.log('[DEBUG:SAGAS] updateReferral', error);
    return null;
  }
}
