import React from 'react';
import RegisterContainer from '../containers/RegisterContainer';
import HeaderContiner from '../containers/HeaderContainer';

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
