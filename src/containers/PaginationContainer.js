import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from '../common/PaginationComponent';
import { setPagenation } from '../modules/pagination';

const PaginationContainer = ({ totalCount, tempValue, period }) => {
  const dispatch = useDispatch();

  let { pagination, user } = useSelector(({ pagination, user }) => ({
    pagination,
    user: user.user,
  }));

  useEffect(() => {
    const { count, block } = pagination;
    let currentPage = 1;

    if (tempValue > 1) {
      currentPage = tempValue;
    }

    let endPage = Math.ceil(currentPage / block) * block;
    const startPage = endPage - block + 1;
    const lastPage = Math.ceil(totalCount / count);

    if (lastPage < endPage) {
      endPage = lastPage;
    }

    dispatch(setPagenation({ currentPage, endPage, startPage, lastPage }));
  }, [dispatch, totalCount, tempValue]);

  return (
    <PaginationComponent
      user={user}
      pagination={pagination}
      period={period}
      totalCount={totalCount}
    />
  );
};

export default PaginationContainer;
