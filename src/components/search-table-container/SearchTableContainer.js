import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Table from "../Table/Table";
import useFetchResults from "../../hooks/useFetchResults";
import "./SearchTableContainer.css";
import KeyMultiSelect from "../KeyMultiSelect/KeyMultiSelect";
const SearchTableContainer = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
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
      <div className="inputs">
        <SearchBox onSearch={handleSearch} loading={loading} />
        <KeyMultiSelect
          data={results}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>

      <Table
        onLimitChange={handleLimitChange}
        results={results}
        loading={loading}
        selectedKeys={selectedKeys}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        limit={limit}
      />
    </div>
  );
};

export default SearchTableContainer;
