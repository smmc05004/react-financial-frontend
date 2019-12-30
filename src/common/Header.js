import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from './HeaderBtn';
import { Link } from 'react-router-dom';

import './Header.css';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  const mm = today.getMonth() + 1;

  return `${yy}-${mm}`;
}

const Header = ({ user, onLogout, onClick }) => {
  return (
    <div className="HeaderWrapper">
      <div className="logo">
        <Link to="/">로고 들어갈 자리</Link>
      </div>

      {user ? (
        // 로그인 한 경우
        <>
          <div className="headerRight">
            {/* 로그아웃 버튼 및 user ID */}
            <span className="userInfo">{`${user.userId}`}</span>
            <span className="headerBtn">
              <Button to="/" btnClass="logoutBtn" onLogout={onLogout}>
                로그아웃
              </Button>
            </span>
          </div>

          {/* 메뉴 */}
          <ul className="menuUl">
            <li className="menuLi">
              <Link
                to={`/ledger/write?pageNum=1&userId=${
                  user.userId
                }&period=${getDefaultPeriod()}`}
              >
                가계부
              </Link>
            </li>
          </ul>
        </>
      ) : (
        // 로그인 하지 않은 경우
        <div className="headerRight">
          <span className="headerBtn">
            <Button to="/" btnClass="loginBtn" onClick={onClick}>
              로그인
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
