import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { modalsActions, PromptModalState, RootState } from 'store';

import Modal from '../Modal';
import './styles.scss';

type Props = ConnectedProps<typeof connector> & PromptModalState;

const PromptModal: React.FC<Props> = ({
  hideModal,
  isPromptModalShown,
  message,
  textNo = 'No',
  textYes = 'Yes',
  title,
  cbOk,
}) =>
  isPromptModalShown ? (
    <Modal title={title} cbClose={() => hideModal()}>
      <div className="promptModal">
        {/* Message */}
        <p>{message}</p>

        {/* buttons */}
        <div className="footer">
          {/* No button */}
          <button onClick={() => hideModal()} type="button" aria-label="No">
            {textNo}
          </button>

          {/* Yes Button */}
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              cbOk?.(event);
              hideModal();
            }}
            type="button"
            aria-label="Yes"
          >
            {textYes}
          </button>
        </div>
      </div>
    </Modal>
  ) : null;

const mapStateToProps = (state: RootState) => ({
  isPromptModalShown: state.modals.promptModal.shown,
});

const mapDispatchToProps = {
  hideModal: modalsActions.hidePromptModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PromptModal);
