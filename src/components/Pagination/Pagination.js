import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  onLimitChange,
}) => {
  const [limit, setLimit] = useState(5);
  const numVisiblePages = 4;
  const halfVisiblePages = Math.floor(numVisiblePages / 2);

  const calculateVisiblePages = () => {
    if (totalPages <= numVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, currentPage + halfVisiblePages);

    const pages = [];
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 10) {
      setLimit(value);
      onLimitChange(value);
    } else if (value > 10) {
      alert("Maximum limit is 10");
    }
  };

  const pages = calculateVisiblePages();

  return (
    <div className="pagination">
      <div className="pagination-container">
        <input
          type="number"
          value={limit}
          onChange={handleLimitChange}
          className="limit-input"
          min="1"
          max="10"
        />
        <span>Items per page</span>
      </div>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
