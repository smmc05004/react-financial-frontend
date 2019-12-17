import React from 'react';
import { withRouter } from 'react-router-dom';

const Button = ({ children, history, to, btnClass, onClick, onLogout }) => {
  return (
    <button
      className={btnClass}
      onClick={children === '로그아웃' ? onLogout : onClick}
    >
      {children}
    </button>
  );
};

export default withRouter(Button);
