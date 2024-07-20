import React, { useEffect, useState, useRef } from "react";
import "./SearchBox.css";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
const SearchBox = ({ onSearch, loading }) => {
  const searchBoxRef = useRef(null);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  useEffect(() => {
    onSearch(query);
  }, [query]);

  // Focus the search box
  const focusSearchBox = () => {
    if (searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
  };

  useKeyboardShortcut(focusSearchBox, "/");

  return (
    <div className="search-box-container">
      <input
        ref={searchBoxRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        disabled={loading}
        className={`search-box ${loading ? "disable-search" : ""}`}
        placeholder="search paces.."
      />
    </div>
  );
};

export default SearchBox;
