import React from 'react';
import YearMonth from '../../common/YearMonth';
import Graph from './Graph';
import './Graph.css';

const LedgerAnalysis = ({ onChangePeriod, period, userId, analysis }) => {
  return (
    <div className="ledgerAnalysis">
      <YearMonth
        onChangePeriod={onChangePeriod}
        period={period}
        userId={userId}
      />

      <Graph analysis={analysis} />
    </div>
  );
};

export default LedgerAnalysis;
