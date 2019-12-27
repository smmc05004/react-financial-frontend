import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeftMenu from '../components/ledger/LeftMenu';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  const mm = today.getMonth() + 1;

  return `${yy}-${mm}`;
}

const LeftMenuContainer = () => {
  const { userId } = useSelector(({ user }) => ({
    userId: user.user.userId,
  }));

  const [perirod] = useState(getDefaultPeriod);

  return <LeftMenu userId={userId} period={perirod} />;
};

export default LeftMenuContainer;
