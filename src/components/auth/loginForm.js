import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onChange, onSubmit }) => {
  return (
    <div className="loginFormWrapper">
      <form className="loginForm" onSubmit={onSubmit}>
        <div className="headerWrapper">
          <h1>LOGIN</h1>
        </div>
        <div className="inputWrapper">
          <input
            type="text"
            name="userId"
            id="userId"
            autoComplete="off"
            placeholder="아이디"
            onChange={onChange}
          />
          <div className="inputUnderBar"></div>
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
          <div className="inputUnderBar"></div>
        </div>
        <div className="loginBtnWrapper">
          <input type="submit" value="로그인" className="loginBtn" />
        </div>
        <div className="registerLink">
          <Link to="/register">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
