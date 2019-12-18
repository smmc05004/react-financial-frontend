import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './PaginationComponent.css';

const PaginationComponent = ({ pagination, userId }) => {
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
            <PaginationLink
              previous
              href={`/ledger?pageNum=${currentPage - 1}&userId=${userId}`}
            />
          </PaginationItem>
        )}

        {numberArr.map(number => (
          <PaginationItem key={number}>
            <PaginationLink href={`/ledger?pageNum=${number}&userId=${userId}`}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage === lastPage ? null : (
          <PaginationItem>
            <PaginationLink
              next
              href={`/ledger?pageNum=${currentPage + 1}&userId=${userId}`}
            />
          </PaginationItem>
        )}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
