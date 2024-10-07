import React, { useEffect, useState } from "react";

// CSS.....
import "./App.css";

// Components
import Search from "./components/Search";
import Profile from "./components/Profile";
import Repo from "./components/Repo";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [defaultData, setDefaultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isFetched, setFetched] = useState(false);

 

  useEffect(() => {
    
      // Only fetch default data if no previous data is found
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch("https://api.github.com/users/github");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setDefaultData(data);
          setLoading(false)
        } catch (error) {
          setError(error.message);
        } 
      };
      fetchData();
    
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 900); // 900ms delay

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${debouncedQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
        setFetched(true);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (isSubmitted) {
      fetchResults();
    }
  }, [isSubmitted]);
  return (
    <main className={`outer-container `}>
      <div className={`inner-container`}>
        <Search
          query={query}
          setQuery={setQuery}
          setSubmitted={setSubmitted}
          debouncedQuery={debouncedQuery}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Profile data={isFetched ? searchResults : defaultData} />
        <Repo
          isSubmitted={isSubmitted}
          debouncedQuery={debouncedQuery}
          setSubmitted={setSubmitted}
        />
      </div>
      <div className="bg-header"></div>
    </main>
  );
}

export default App;
