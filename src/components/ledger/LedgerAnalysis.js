import React from 'react';
import YearMonth from '../../common/YearMonth';
import Graph from './Graph';
import './Graph.css';

const LedgerAnalysis = ({
  onChangePeriod,
  period,
  userId,
  expense,
  income,
}) => {
  return (
    <div className="ledgerAnalysis">
      <YearMonth
        onChangePeriod={onChangePeriod}
        period={period}
        userId={userId}
      />

      <Graph expense={expense} income={income} />
    </div>
  );
};

export default LedgerAnalysis;
