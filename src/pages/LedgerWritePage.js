import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import LeftMenu from '../components/ledger/LeftMenu';
import LedgerListContainer from '../containers/LedgerListContainer';
import LedgerGraphContainer from '../containers/LedgerGraphContainer';
import './LedgerWritePage.css';

const LedgerWritePage = () => {
  return (
    <div className="LedgerPageWrapper">
      <HeaderContainer />
      <LeftMenu />
      <div className="ledgerWrapper">
        <LedgerGraphContainer />
        <LedgerListContainer />
      </div>
    </div>
  );
};
export default LedgerWritePage;
