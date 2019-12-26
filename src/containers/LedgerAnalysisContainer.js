import React from 'react';
import Analysis from '../components/ledger/Analysis';
import { useDispatch, useSelector } from 'react-redux';
import { setPeriod } from '../modules/ledger';

const LedgerAnalysisContainer = () => {
  const dispatch = useDispatch();
  const { user, list, period } = useSelector(({ user, ledger }) => ({
    user: user.user,
    list: ledger.list,
    period: ledger.list.period,
  }));

  const onChangePeriod = e => {
    console.log('날짜 변경');
    const { value } = e.target;
    dispatch(setPeriod({ period: value }));
  };

  return <Analysis onChangePeriod={onChangePeriod} />;
};

export default LedgerAnalysisContainer;
