import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LedgerAnalysisContainer from '../containers/LedgerAnalysisContainer';
import LeftMenu from '../components/ledger/LeftMenu';

const LedgerAnalysisPage = () => {
  return (
    <div className="LedgerPageWrapper">
      <HeaderContainer />
      <LeftMenu />
      <div className="ledgerWrapper">
        <LedgerAnalysisContainer />
      </div>
    </div>
  );
};

export default LedgerAnalysisPage;
