import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from 'reactstrap';
import './PaginationComponent.css';

const PaginationComponent = ({ pagination, userId, period }) => {
  const { currentPage, lastPage } = pagination;

  const numberArr = [];
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    numberArr.push(i);
  }
  console.log('현페: ', currentPage);
  return (
    <div className="pagination">
      <Pagination size="sm" aria-label="Page navigation example">
        <PaginationItem disabled={currentPage === 1}>
          <Link
            to={`/ledger/write?pageNum=${currentPage -
              1}&userId=${userId}&period=${period}`}
            className="page-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Previous</span>
          </Link>
        </PaginationItem>

        {numberArr.map(number => (
          <PaginationItem key={number} active={number === currentPage}>
            <Link
              to={`/ledger/write?pageNum=${number}&userId=${userId}&period=${period}`}
              className="page-link"
            >
              {number}
            </Link>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === lastPage}>
          <Link
            to={`/ledger/write?pageNum=${currentPage +
              1}&userId=${userId}&period=${period}`}
            className="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">›</span>
            <span className="sr-only">Next</span>
          </Link>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
