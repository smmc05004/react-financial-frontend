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

  return (
    <div className="pagination">
      <Pagination size="sm" aria-label="Page navigation example">
        {currentPage === 1 ? null : (
          <PaginationItem>
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
        )}

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

        {currentPage === lastPage ? null : (
          <PaginationItem>
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
        )}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
