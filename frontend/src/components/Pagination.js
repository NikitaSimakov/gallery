import React from 'react';
import css from "./Pagination.module.scss";

const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
  return (
    <div className={css.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
