import React from 'react';
import RegisterContainer from '../containers/RegisterContainer';
import HeaderContiner from '../containers/HeaderContainer';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <>
      <div className="registerPageWrapper">
        <HeaderContiner />
        <RegisterContainer />
      </div>
    </>
  );
};

export default RegisterPage;
