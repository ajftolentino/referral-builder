import { takeLatest } from 'redux-saga/effects';
import { referralsActions } from 'store';

import {
  createReferral,
  deleteReferral,
  getReferral,
  getReferrals,
  updateReferral,
} from './referrals';

export default function* rootSaga() {
  yield takeLatest(referralsActions.createReferral.type, createReferral);
  yield takeLatest(referralsActions.deleteReferral.type, deleteReferral);
  yield takeLatest(referralsActions.getReferral.type, getReferral);
  yield takeLatest(referralsActions.getReferrals.type, getReferrals);
  yield takeLatest(referralsActions.updateReferral.type, updateReferral);
}
