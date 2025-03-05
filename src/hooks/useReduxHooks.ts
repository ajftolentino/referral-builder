import { Action, Dispatch } from '@reduxjs/toolkit';
import React, { useContext } from 'react';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'store/configureStore';

const reduxHooksContext = React.createContext<{
  useReduxDispatch: () => Dispatch<Action>;
  useReduxSelector: TypedUseSelectorHook<RootState>;
} | null>(null);
export const { Provider: ReduxHooksProvider } = reduxHooksContext;
export const useReduxHooks = () => useContext(reduxHooksContext);
