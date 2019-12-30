import React from 'react';
import LoginContainer from '../containers/LoginContainer';
// import Header from '../common/Header';
import HeaderContainer from '../containers/HeaderContainer';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="loginPageWrapper">
      <HeaderContainer />
      <LoginContainer />
    </div>
  );
};

export default LoginPage;
