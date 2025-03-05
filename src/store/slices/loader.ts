import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoaderState = {
  message: string | null;
  shown: boolean;
};

const initialState: LoaderState = {
  message: null,
  shown: false,
};

const loaderSlices = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<LoaderState>) => {
      const { message, shown } = action.payload;
      state.message = message;
      state.shown = shown;
    },
  },
});

export const loaderActions = {
  ...loaderSlices.actions,
};

export default loaderSlices.reducer;
