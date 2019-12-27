import React, { useEffect } from 'react';
import LedgerAnalysis from '../components/ledger/LedgerAnalysis';
import { useDispatch, useSelector } from 'react-redux';
import { setPeriod, ledgerAnalysis } from '../modules/ledger';
import { withRouter } from 'react-router-dom';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  const mm = today.getMonth() + 1;

  return `${yy}-${mm}`;
}

const LedgerAnalysisContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, userId, period, expense, income } = useSelector(
    ({ user, ledger }) => ({
      user: user.user,
      userId: user.user.userId,
      period: ledger.period,
      expense: ledger.analysis.expense,
      income: ledger.analysis.income,
    }),
  );

  useEffect(() => {
    const defaultPeriod = getDefaultPeriod();
    dispatch(setPeriod({ period: defaultPeriod }));
  }, [dispatch]);

  useEffect(() => {
    if (userId && period) {
      dispatch(ledgerAnalysis({ userId, period }));
    }
  }, [dispatch, userId, period]);

  const onChangePeriod = e => {
    const { value } = e.target;
    dispatch(setPeriod({ period: value }));
    history.push(`/ledger/analysis?userId=${user.userId}&period=${value}`);
  };

  return (
    <LedgerAnalysis
      onChangePeriod={onChangePeriod}
      period={period}
      userId={user.userId}
      expense={expense}
      income={income}
    />
  );
};

export default withRouter(LedgerAnalysisContainer);
