import React from 'react';
import YearMonth from '../../common/YearMonth';
import Graph from './Graph';
import './Graph.css';

const Analysis = ({ onChangePeriod }) => {
  return (
    <div className="ledgerAnalysis">
      <YearMonth onChangePeriod={onChangePeriod} />

      <Graph />
    </div>
  );
};

export default Analysis;
