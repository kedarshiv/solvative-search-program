import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Custom hook to handle Fetch API calls.
 *
 * @param {string} query - this is the inputs on which data is being searched.
 * @param {number} limit - how much data to be fetched per request.
 * @param {number} page - Used to set the offset from which it needs to fetch data
 */
const useFetchResults = (query, limit, page) => {
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            offset: (page - 1) * limit,
            limit: limit,
            namePrefix: query,
          },
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          },
        });
        setResults(response.data.data);
        setTotalCount(response.data.metadata.totalCount);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      setResults([]);
      setTotalCount(0);
    }
  };

  const debounceFunction = useDebounce(fetchResults, 1000);

  /*
    Make an API call after delay given in
    debouce function when user search for country
  */
  useEffect(() => {
    debounceFunction();
  }, [query]);

  /*
    Make an API call on changing the limit or page without wait
  */
  useEffect(() => {
    fetchResults();
  }, [limit, page]);

  return { results, totalCount, loading };
};

export default useFetchResults;
