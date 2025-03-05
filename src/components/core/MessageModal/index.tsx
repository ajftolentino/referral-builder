import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { modalsActions, MessageModalState, RootState } from 'store';

import Modal from '../Modal';

type Props = MessageModalState & ConnectedProps<typeof connector>;

const MessageModal: React.FC<Props> = ({
  message,
  hideModal,
  isMessageModalShown,
  title,
  cbClose,
}) => {
  const onClose = useCallback(() => {
    cbClose?.();
    hideModal();
  }, [cbClose, hideModal]);

  return isMessageModalShown ? (
    <Modal title={title} cbClose={onClose}>
      <p>{message}</p>
    </Modal>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  isMessageModalShown: state.modals.messageModal.shown,
});

const mapDispatchToProps = {
  hideModal: modalsActions.hideMessageModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MessageModal);
