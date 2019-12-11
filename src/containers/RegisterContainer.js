import React, { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, changeValue, register } from '../modules/auth';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const { userName, userId, password } = useSelector(({ auth }) => ({
    userName: auth.register.userName,
    userId: auth.register.userId,
    password: auth.register.password,
  }));

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

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
    dispatch(
      register({
        userName,
        userId,
        password,
      }),
    );
  };

  return <RegisterForm onChange={onChange} onSubmit={onSubmit} />;
};

export default RegisterContainer;
