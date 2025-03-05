import { useEffect } from 'react';
import {
  LoaderState,
  modalsActions,
  ModalsState,
  referralsActions,
  ReferralsState,
  RootState,
} from 'store';

import { useReduxHooks } from './useReduxHooks';

export const useErrorMessage = (
  stateName: 'referrals',
  onClose?: () => void
) => {
  const { useReduxDispatch, useReduxSelector: useSelector } =
    useReduxHooks() ?? {};

  const dispatch = useReduxDispatch?.();
  const rootState = useSelector?.(
    (rootState: RootState) => rootState[stateName as keyof RootState]
  );

  const getActions = (name: 'referrals') => {
    switch (name) {
      case 'referrals':
        return referralsActions;
    }
  };

  const getState = (
    name: 'referrals',
    state?: LoaderState | ModalsState | ReferralsState
  ) => {
    if (!state) {
      return null;
    }
    switch (name) {
      case 'referrals':
        return state as ReferralsState;
    }
  };

  const actions = getActions(stateName);
  const finalState = getState(stateName, rootState);

  useEffect(() => {
    if (actions.reset.type && finalState?.errors && dispatch) {
      dispatch({
        payload: {
          isMessageModalShown: true,
          message: finalState.errors,
          cbClose: () => {
            onClose?.();
            dispatch({
              type: actions.reset.type,
            });
          },
        },
        type: modalsActions.renderMessageModal.type,
      });
    }
  }, [actions.reset.type, finalState?.errors, dispatch, onClose]);
};
