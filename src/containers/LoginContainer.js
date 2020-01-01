import React, { useEffect } from 'react';
import LoginForm from '../components/auth/loginForm';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, changeValue, login } from '../modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../modules/user';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  let mm = today.getMonth() + 1;

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yy}-${mm}`;
}

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
      const period = getDefaultPeriod();
      history.push(
        `/ledger/write?pageNum=1&userId=${user.userId}&period=${period}`,
      );
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
