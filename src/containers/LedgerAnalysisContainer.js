import React, { useEffect } from 'react';
import LedgerAnalysis from '../components/ledger/LedgerAnalysis';
import { useDispatch, useSelector } from 'react-redux';
import { setPeriod, ledgerAnalysis } from '../modules/ledger';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const LedgerAnalysisContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const { user, userId, period, analysis } = useSelector(
    ({ user, ledger }) => ({
      user: user.user,
      userId: user.user.userId,
      period: ledger.period,
      analysis: ledger.analysis,
    }),
  );

  useEffect(() => {
    // 요청 url에서 쿼리스트링 가져와서 period 세팅
    const { period } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (period) {
      dispatch(setPeriod({ period }));
    } else {
      alert('기간이 설정되지 않았습니다.');
    }
  }, [dispatch, location.search]);

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
      analysis={analysis}
    />
  );
};

export default withRouter(LedgerAnalysisContainer);
