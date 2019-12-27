import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
// import LeftMenu from '../components/ledger/LeftMenu';
import LedgerListContainer from '../containers/LedgerListContainer';
import './LedgerWritePage.css';
import LeftMenuContainer from '../containers/LeftMenuContainer';

const LedgerWritePage = () => {
  return (
    <div className="LedgerPageWrapper">
      <HeaderContainer />
      <LeftMenuContainer />
      <div className="ledgerWrapper">
        <LedgerListContainer />
      </div>
    </div>
  );
};
export default LedgerWritePage;
