import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LedgerWritePage from './pages/LedgerWritePage';

const App = () => {
  return (
    <>
      <Route path="/" component={MainPage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/ledger" component={LedgerWritePage} />
    </>
  );
};

export default App;
