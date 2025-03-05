import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modalsActions, referralsActions } from 'store';
import { Referral } from 'types';

import './styles.scss';

type Props = ConnectedProps<typeof connector> & {
  referral: Referral;
};

const ReferralItem: React.FC<Props> = ({
  referral,
  deleteReferral,
  promptModal,
}) => {
  const navigate = useNavigate();

  const onEditReferral = useCallback(() => {
    if (referral.id) {
      console.log('[DEBUG] referral.id', referral.id);
      navigate(`/referral/${referral.id}`);
    }
  }, [referral.id, navigate]);

  const onDeleteItem = useCallback(() => {
    if (referral.id) {
      promptModal({
        message: 'Are you sure you want to delete this referral?',
        shown: true,
        cbOk: () => deleteReferral(referral.id!),
        title: 'Confirm Deletion',
      });
    }
  }, [referral.id, deleteReferral, promptModal]);

  return (
    <div className="referralItem">
      {!referral.id ? (
        <span>Invalid Referral</span>
      ) : (
        <>
          <span className="givenName">
            <p>{referral.givenName}</p>
          </span>
          <span className="surname">
            <p>{referral.surname}</p>
          </span>
          <span className="email">
            <p>{referral.email}</p>
          </span>
          <span className="phone">
            <p>{referral.phone}</p>
          </span>
          <span className="actions">
            <button onClick={onEditReferral}>
              <span className="icon-pencil" />
            </button>
            <button onClick={onDeleteItem}>
              <span className="icon-bin" />
            </button>
          </span>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  deleteReferral: referralsActions.deleteReferral,
  promptModal: modalsActions.renderPromptModal,
};

const connector = connect(undefined, mapDispatchToProps);

export default connector(ReferralItem);
