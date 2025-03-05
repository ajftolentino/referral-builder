import {
  Action,
  combineReducers,
  configureStore,
  Dispatch,
  Reducer,
  Store,
} from '@reduxjs/toolkit';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootSaga from './sagas/root';
import loaderReducer from './slices/loader';
import modalsReducer from './slices/modals';
import referralsReducer from './slices/referrals';

const appReducer = combineReducers({
  loader: loaderReducer,
  modals: modalsReducer,
  referrals: referralsReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: Action) => {
  return appReducer(state, action);
};

export type ConfigureStore = {
  store?: Store | undefined;
  persistor?: Persistor;
  sagaMiddleware?: SagaMiddleware;
  useReduxDispatch: () => Dispatch<Action>;
  useReduxSelector: TypedUseSelectorHook<RootState>;
};

export const initializeStore = (): ConfigureStore => {
  const persistConfig = {
    timeout: 10000,
    key: 'referral-builder',
    storage,
  };

  const persistedReducer = persistReducer(
    persistConfig,
    rootReducer as Reducer
  );
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  // Use throughout your app instead of plain `useDispatch` and `useSelector`
  const useReduxDispatch = () => useDispatch<typeof store.dispatch>();
  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

  return {
    store,
    persistor,
    sagaMiddleware,
    useReduxDispatch,
    useReduxSelector,
  };
};
