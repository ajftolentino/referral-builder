import { connect, ConnectedProps } from 'react-redux';
import React, { useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Header,
  Loader,
  MessageModal,
  PromptModal,
  Referrals,
} from 'components/core';
import { CreateReferral, UpdateReferral } from 'components/routes';
import { RootState } from 'store';

type Props = ConnectedProps<typeof connector>;

const AppBase: React.FC<Props> = ({
  loader,
  messageModalState,
  promptModalState,
}) => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    if (window.history.length > 0) {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <>
      <Header toggleLeftSidebar={goBack} />

      <Routes>
        <Route path="/" element={<Referrals />} />
        <Route path="/referral" element={<CreateReferral />} />
        <Route path="/referral/:id" element={<UpdateReferral />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <MessageModal {...messageModalState} />
      <PromptModal {...promptModalState} />

      {loader.shown && !!loader.message?.trim() && (
        <Loader message={loader.message} />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  loader: state.loader,
  messageModalState: state.modals.messageModal,
  promptModalState: state.modals.promptModal,
});

const connector = connect(mapStateToProps);

export default connector(AppBase);
