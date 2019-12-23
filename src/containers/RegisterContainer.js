import React, { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  initializeForm,
  changeValue,
  register,
  changeError,
} from '../modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../modules/user';

const RegisterContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, formErr, auth, authError, user } = useSelector(
    ({ auth, user }) => ({
      form: auth.register,
      formErr: auth.registerErr,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      alert('에러 발생', authError);
      return;
    }

    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(
      changeValue({
        type: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { userName, userId, password, passwordConfirm } = form;

    if ([userName, userId, password, passwordConfirm].includes('')) {
      alert('입력값을 다시 확인해 주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    dispatch(
      register({
        userName,
        userId,
        password,
      }),
    );
  };

  const onBlur = e => {
    const { userNameErr, userIdErr, passwordErr, passwordConfirmErr } = formErr;
    const { password, passwordConfirm } = form;
    const { name, value } = e.target;

    let msg = '';
    let result = false;

    // 아이디 입력 에러
    // 아이디 입력 안 한 경우
    if (name === 'userId' && value === '') {
      msg = '아이디를 입력해 주세요';
      result = true;
      dispatch(changeError({ name, result, msg }));
    } else if (name === 'userId' && userIdErr[0] === true) {
      msg = '';
      result = false;
      dispatch(changeError({ name, result, msg }));
    }

    // 이름 입력 에러
    // 이름 입력 안 한 경우
    if (name === 'userName' && value === '') {
      msg = '이름을 입력해 주세요';
      result = true;
      dispatch(changeError({ name, result, msg }));
    } else if (name === 'userName' && userNameErr[0] === true) {
      msg = '';
      result = false;
      dispatch(changeError({ name, result, msg }));
    }

    // 비밀번호 입력 에러
    // 비밀번호 입력 안 한 경우
    if (name === 'password' && value === '') {
      msg = '비밀번호를 입력해 주세요';
      result = true;
      dispatch(changeError({ name, result, msg }));
    }
    // 비밀번호, 비밀번호 확인이 일치하지 않을 때
    else if (
      name === 'password' &&
      passwordConfirm !== '' &&
      password !== passwordConfirm
    ) {
      msg = '비밀번호가 일치하지 않습니다.';
      result = true;
      dispatch(changeError({ name: 'passwordConfirm', result, msg }));
    }
    // 비번 입력했고, 비번 확인과 일치한 경우
    else if (name === 'password' && passwordErr[0] === true) {
      msg = '';
      result = false;
      dispatch(changeError({ name, result, msg }));
    }

    // 비밀번호 확인 입력 에러
    // 아이디 입력 안 한 경우
    if (name === 'passwordConfirm' && password !== passwordConfirm) {
      msg = '비밀번호가 일치하지 않습니다.';
      result = true;
      dispatch(changeError({ name, result, msg }));
    } else if (name === 'passwordConfirm' && passwordConfirmErr[0] === true) {
      msg = '';
      result = false;
      dispatch(changeError({ name, result, msg }));
    }
  };
  return (
    <RegisterForm
      onChange={onChange}
      onSubmit={onSubmit}
      onBlur={onBlur}
      formErr={formErr}
    />
  );
};

export default withRouter(RegisterContainer);
