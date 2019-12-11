import React, { useEffect } from 'react';
import LoginForm from '../components/auth/loginForm';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, changeValue } from '../modules/auth';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { userId, password } = useSelector(({ auth }) => ({
    userId: auth.login.userId,
    password: auth.login.password,
  }));

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  const onChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    dispatch(
      changeValue({
        type: 'login',
        key: name,
        value,
      }),
    );
  };

  return <LoginForm onChange={onChange} />;
};
export default LoginContainer;
