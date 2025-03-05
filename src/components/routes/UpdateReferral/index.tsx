import { ReferralForm } from 'components/core';
import React, { useCallback, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { referralsActions, RootState } from 'store';
import { usePrevious } from 'hooks';
import { Referral } from 'types';

import './styles.scss';

type Props = ConnectedProps<typeof connector>;

const UpdateReferral: React.FC<Props> = ({
  errors,
  referrals,
  reset,
  selectedReferral,
  getReferral,
  selectReferral,
  updateReferral,
}) => {
  const routeMatch = useMatch({ path: '/referral/:id', end: true });
  const navigate = useNavigate();

  const referralId = routeMatch?.params.id;
  const previousReferral = usePrevious(selectedReferral);

  useEffect(() => {
    if (!referralId) {
      return;
    }
    if (selectedReferral?.id !== referralId) {
      if (referrals.length > 0) {
        const match = referrals.find((value) => value.id === referralId);
        if (match) {
          selectReferral(match);
        } else {
          getReferral(referralId);
        }
      } else {
        getReferral(referralId);
      }
    }
  }, [
    referralId,
    referrals,
    selectedReferral?.id,
    getReferral,
    selectReferral,
  ]);

  useEffect(() => {
    if (!(selectedReferral && previousReferral)) {
      return;
    }
    if (
      selectedReferral.email !== previousReferral.email ||
      selectedReferral.givenName !== previousReferral.givenName ||
      selectedReferral.phone !== previousReferral.phone ||
      selectedReferral.surname !== previousReferral.surname ||
      selectedReferral.address?.building !==
        previousReferral.address?.building ||
      selectedReferral.address?.city !== previousReferral.address?.city ||
      selectedReferral.address?.country !== previousReferral.address?.country ||
      selectedReferral.address?.stateOrProvince !==
        previousReferral.address?.stateOrProvince ||
      selectedReferral.address?.street !== previousReferral.address?.street ||
      selectedReferral.address?.zipCode !== previousReferral.address?.zipCode
    ) {
      navigate('/');
    }
  }, [previousReferral, selectedReferral, navigate]);

  useEffect(() => {
    return () => {
      selectReferral(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateReferral = useCallback(
    (referral: Referral) => {
      updateReferral(referral);
    },
    [updateReferral]
  );

  return (
    <ReferralForm
      errors={errors}
      onSubmit={onUpdateReferral}
      referral={selectedReferral}
      reset={reset}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  errors: state.referrals.errors,
  referrals: state.referrals.referrals,
  selectedReferral: state.referrals.selectedReferral,
});

const mapDispatchToProps = {
  reset: referralsActions.reset,
  getReferral: referralsActions.getReferral,
  selectReferral: referralsActions.selectReferral,
  updateReferral: referralsActions.updateReferral,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UpdateReferral);
