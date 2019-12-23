import React from 'react';
import { Link } from 'react-router-dom';

const Analysis = () => {
  return (
    <div>
      <Link to={'/ledger?pageNum=1&userId=undefined&yearMonth=2019-12'}>
        쓰기 이동
      </Link>
      <p>분석 페이지</p>
    </div>
  );
};

export default Analysis;
