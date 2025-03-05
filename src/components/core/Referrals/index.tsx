import React, { useCallback, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader, ReferralItem, TableHeader } from 'components/core';
import { useErrorMessage } from 'hooks';
import { referralsActions, RootState } from 'store';

import './styles.scss';

type Props = ConnectedProps<typeof connector>;

const Referrals: React.FC<Props> = ({
  hasActivity,
  referrals,
  getReferrals,
}) => {
  const navigate = useNavigate();

  useErrorMessage('referrals');

  useEffect(() => {
    getReferrals();
  }, [getReferrals]);

  const onCreatePress = useCallback(() => {
    navigate('/referral');
  }, [navigate]);

  return (
    <div className="referrals">
      <div className="buttonContainer">
        <button className="clickable" onClick={onCreatePress}>
          <span>
            <span className="icon-plus" />
            Create
          </span>
        </button>
      </div>
      <TableHeader />
      {hasActivity ? (
        <Loader type="screen" />
      ) : referrals.length > 0 ? (
        referrals.map((value) => (
          <ReferralItem key={value.id!} referral={value} />
        ))
      ) : (
        <p className="emptyLabel">There are no referrals yet.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  hasActivity: state.referrals.hasActivity,
  referrals: state.referrals.referrals,
});

const mapDispatchToProps = {
  getReferrals: referralsActions.getReferrals,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Referrals);
