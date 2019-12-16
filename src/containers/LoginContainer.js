import React, { useEffect } from 'react';
import LoginForm from '../components/auth/loginForm';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, changeValue, login } from '../modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../modules/user';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      alert('에러 발생: ', authError);
      return;
    }

    if (auth) {
      dispatch(check());
    }
  }, [dispatch, auth, authError]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

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

  const onSubmit = e => {
    e.preventDefault();
    const { userId, password } = form;
    dispatch(login({ userId, password }));
  };

  return <LoginForm onChange={onChange} onSubmit={onSubmit} />;
};
export default withRouter(LoginContainer);
