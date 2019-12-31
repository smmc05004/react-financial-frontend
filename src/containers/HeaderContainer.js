import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../common/Header';
import { logout } from '../modules/user';
import { withRouter } from 'react-router-dom';

const HeaderContiner = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onLogout = () => {
    dispatch(logout());
  };

  const onClick = () => {
    history.push('/');
  };

  useEffect(() => {
    if (user === null) {
      if (history.location.pathname === '/register') {
        history.push('/register');
      } else {
        history.push('/');
      }
    }
  }, [user, history]);
  return <Header user={user} onLogout={onLogout} onClick={onClick} />;
};

export default withRouter(HeaderContiner);
