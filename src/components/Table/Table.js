import React from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";

export function camelCaseToReadable(camelCaseStr) {
  // Add a space before each uppercase letter
  const result = camelCaseStr.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Capitalize the first letter of the resulting string
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const Table = ({
  results,
  loading,
  totalCount,
  page,
  setPage,
  limit,
  onLimitChange,
  selectedKeys,
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
              {selectedKeys.map((key) => {
                return <th>{camelCaseToReadable(key)}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {results.length
              ? results.map((item, index) => (
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
                    {selectedKeys.map((key) => {
                      return <td>{item[key]}</td>;
                    })}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
      {
        <div className="search-message">
          {!results.length
            ? totalCount
              ? "No result found"
              : "Start searching"
            : null}
        </div>
      }
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
