import React from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";
const Table = ({
  results,
  loading,
  totalCount,
  page,
  setPage,
  limit,
  onLimitChange,
}) => {
  const handlePageChange = (pageIndex) => {
    setPage(pageIndex);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {results.length ? (
              results.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`https://flagsapi.com/${item.countryCode}/flat/16.png`}
                      alt={item.country}
                    />
                    {item.country}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  {totalCount ? "No result found" : "Start searching"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {totalCount > 0 && (
        <Pagination
          onLimitChange={onLimitChange}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;
