import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from './HeaderBtn';

import './Header.css';

const Header = ({ user, onLogout, onClick }) => {
  // console.log('컨테이너에서 받아온 user:', user);
  return (
    <div className="HeaderWrapper">
      <div className="logo">로고 들어갈 자리</div>
      {user ? (
        <div className="headerRight">
          <span className="userInfo">{user.userId}</span>
          <span className="headerBtn">
            <Button to="/" btnClass="logoutBtn" onLogout={onLogout}>
              로그아웃
            </Button>
          </span>
        </div>
      ) : (
        <div className="headerRight">
          <span className="headerBtn">
            <Button to="/login" btnClass="loginBtn" onClick={onClick}>
              로그인
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
