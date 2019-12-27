import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LedgerAnalysisContainer from '../containers/LedgerAnalysisContainer';
import LeftMenuContainer from '../containers/LeftMenuContainer';

const LedgerAnalysisPage = () => {
  return (
    <div className="LedgerPageWrapper">
      <HeaderContainer />
      <LeftMenuContainer />
      <div className="ledgerWrapper">
        <LedgerAnalysisContainer />
      </div>
    </div>
  );
};

export default LedgerAnalysisPage;
