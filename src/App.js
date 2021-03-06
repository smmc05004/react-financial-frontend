import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LedgerWritePage from './pages/LedgerWritePage';
import LedgerAnalysisPage from './pages/LedgerAnalysisPage';

const App = () => {
  return (
    <>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/ledger/write" component={LedgerWritePage} />
      <Route path="/ledger/analysis" component={LedgerAnalysisPage} />
    </>
  );
};

export default App;
