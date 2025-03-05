import { ReferralForm } from 'components/core';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { usePrevious } from 'hooks';
import { referralsActions, RootState } from 'store';
import { Referral } from 'types';

import './styles.scss';

type Props = ConnectedProps<typeof connector>;

const CreateReferral: React.FC<Props> = ({
  errors,
  createReferral,
  referrals,
  reset,
}) => {
  const navigate = useNavigate();

  const previousLength = usePrevious(referrals.length);

  useEffect(() => {
    if (referrals.length !== previousLength && referrals.length > 0) {
      navigate('/');
    }
  }, [previousLength, referrals.length, navigate]);

  const onCreateReferral = useCallback(
    (referral: Referral) => {
      createReferral(referral);
    },
    [createReferral]
  );

  return (
    <ReferralForm errors={errors} onSubmit={onCreateReferral} reset={reset} />
  );
};

const mapStateToProps = (state: RootState) => ({
  errors: state.referrals.errors,
  referrals: state.referrals.referrals,
});

const mapDispatchToProps = {
  createReferral: referralsActions.createReferral,
  reset: referralsActions.reset,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CreateReferral);
