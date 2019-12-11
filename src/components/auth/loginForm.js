import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onChange }) => {
  return (
    <div className="loginFormWrapper">
      <form className="loginForm">
        <div className="inputWrapper">
          <input
            type="text"
            name="userId"
            id="userId"
            autoComplete="off"
            placeholder="아이디"
            onChange={onChange}
          />
        </div>
        <div className="inputWrapper">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            placeholder="비밀번호"
            onChange={onChange}
          />
        </div>
        <div className="loginBtnWrapper">
          <input type="submit" value="로그인" />
        </div>
      </form>
      <div>
        <Link to="/register">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginForm;
