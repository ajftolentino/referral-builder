import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { withPayloadType } from 'helpers';
import { Errors, Referral } from 'types';

export type Referrals = Referral[];

export type ReferralsState = {
  errors?: Errors;
  hasActivity: boolean;
  referrals: Referrals;
  selectedReferral: Referral | null;
};

const initialState: ReferralsState = {
  errors: undefined,
  hasActivity: false,
  referrals: [],
  selectedReferral: null,
};

const referralsSlices = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    addCreatedReferral: (state, action: PayloadAction<Referral>) => {
      state.referrals = [...state.referrals, action.payload];
    },
    failure: (state, action: PayloadAction<Errors>) => {
      state.errors = action.payload;
    },
    request: (state) => {
      state.errors = undefined;
      state.hasActivity = true;
    },
    reset: (state) => {
      state.errors = undefined;
      state.hasActivity = false;
    },
    selectReferral: (state, action: PayloadAction<Referral | null>) => {
      state.selectedReferral = action.payload;
    },
    setReferrals: (state, action: PayloadAction<Referrals>) => {
      state.errors = undefined;
      state.hasActivity = false;
      state.referrals = action.payload ?? [];
    },
    updateSelectedReferral: (state, action: PayloadAction<Referral>) => {
      const referralId = action.payload.id;
      if (referralId) {
        state.selectedReferral = action.payload;
        const existingIndex = state.referrals.findIndex(
          (value) => value.id === referralId
        );
        if (existingIndex === -1) {
          state.referrals = [...state.referrals, action.payload];
          return;
        }
        const copy = [...state.referrals];
        copy.splice(existingIndex, 1);
        state.referrals = [...copy, action.payload];
      } else {
        state.selectedReferral = null;
      }
    },
  },
});

export const referralsActions = {
  ...referralsSlices.actions,
  createReferral: createAction(
    'referrals/createReferral',
    withPayloadType<Referral>()
  ),
  deleteReferral: createAction(
    'referrals/deleteReferral',
    withPayloadType<string>()
  ),
  getReferral: createAction('referrals/getReferral', withPayloadType<string>()),
  getReferrals: createAction('referrals/getReferrals'),
  updateReferral: createAction(
    'referrals/updateReferral',
    withPayloadType<Referral>()
  ),
};

export default referralsSlices.reducer;
