import { MouseEventHandler } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* eslint-disable no-unused-vars */
export enum MODAL_TYPES {
  MESSAGE_MODAL,
  PROMPT_MODAL,
}

export interface MessageModalState {
  title: string;
  message: string;
  shown?: boolean;
  cbClose?: () => void;
}

export interface PromptModalState {
  message: string;
  shown?: boolean;
  textNo?: string;
  textYes?: string;
  title: string;
  cbOk?: MouseEventHandler<HTMLButtonElement>;
}

// Define a type for the slice state
export type ModalsState = {
  messageModal: MessageModalState;
  promptModal: PromptModalState;
};

// Define the initial state using that type
const initialState: ModalsState = {
  messageModal: {} as MessageModalState,
  promptModal: {} as PromptModalState,
};

export const modalsSlices = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    renderMessageModal: (state, action: PayloadAction<MessageModalState>) => {
      const { payload } = action;
      const { message, title, cbClose } = payload;
      const { messageModal } = state;
      return {
        ...state,
        messageModal: {
          ...messageModal,
          message,
          shown: true,
          title,
          cbClose,
        },
      };
    },
    renderPromptModal: (state, action: PayloadAction<PromptModalState>) => {
      const { payload } = action;
      const { cbOk, message, textNo, textYes, title } = payload;
      const { promptModal } = state;
      return {
        ...state,
        promptModal: {
          ...promptModal,
          cbOk: cbOk,
          message,
          shown: true,
          textNo,
          textYes,
          title,
        },
      };
    },
    hideMessageModal: (state) => {
      state.messageModal.shown = false;
    },
    hidePromptModal: (state) => {
      state.promptModal.shown = false;
    },
  },
});

export const modalsActions = {
  ...modalsSlices.actions,
};

export default modalsSlices.reducer;
