import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeftMenu from '../components/ledger/LeftMenu';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  let mm = today.getMonth() + 1;

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yy}-${mm}`;
}

const LeftMenuContainer = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const [perirod] = useState(getDefaultPeriod);

  return <LeftMenu user={user} period={perirod} />;
};

export default LeftMenuContainer;
