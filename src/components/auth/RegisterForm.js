import React from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onChange, onSubmit, onBlur, formErr }) => {
  // console.log('userName: ', formErr.userName[0]);
  return (
    <div className="registerFormWrapper">
      <form className="registerForm" onSubmit={onSubmit}>
        <div className="headerWrapper">
          <h1>REGISTER</h1>
        </div>
        <div className="inputWrapper">
          <input
            type="text"
            name="userId"
            id="userId"
            autoComplete="off"
            placeholder="아이디"
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="inputUnderBar"></div>
          {formErr.userIdErr[0] === true && (
            <div className="inputError">{formErr.userIdErr[1]}</div>
          )}
        </div>
        <div className="inputWrapper">
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            placeholder="이름"
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="inputUnderBar"></div>
          {formErr.userNameErr[0] === true && (
            <div className="inputError">{formErr.userNameErr[1]}</div>
          )}
        </div>
        <div className="inputWrapper">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            placeholder="비밀번호"
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="inputUnderBar"></div>
          {formErr.passwordErr[0] === true && (
            <div className="inputError">{formErr.passwordErr[1]}</div>
          )}
        </div>
        <div className="inputWrapper">
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="off"
            placeholder="비밀번호 확인"
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="inputUnderBar"></div>
          {formErr.passwordConfirmErr[0] === true && (
            <div className="inputError">{formErr.passwordConfirmErr[1]}</div>
          )}
        </div>
        <div className="registerBtnWrapper">
          <input type="submit" value="가입하기" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
