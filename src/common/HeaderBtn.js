import React from 'react';
import { withRouter } from 'react-router-dom';

const Button = ({ children, history, to, btnClass, onClick, onLogout }) => {
  console.log('param- to:', to, ' children: ', children);
  console.log('onClick: ', onClick);
  console.log('onLogout: ', onLogout);

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
