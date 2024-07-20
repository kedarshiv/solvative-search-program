import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Table from "../Table/Table";
import useFetchResults from "../../hooks/useFetchResults";
import "./SearchTableContainer.css";

const SearchTableContainer = () => {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const { results, totalCount, loading } = useFetchResults(query, limit, page);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} loading={loading} />

      <Table
        onLimitChange={handleLimitChange}
        results={results}
        loading={loading}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        limit={limit}
      />
    </div>
  );
};

export default SearchTableContainer;
