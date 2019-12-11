import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <>
      <Route path="/" component={MainPage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </>
  );
};

export default App;
