import React, { useState,useEffect } from "react";
import "../css/search.css";
import searchIcon from "../assets/images/search.svg";
function Search({ query, setQuery,setSubmitted,debouncedQuery }) {
  const [isValid, setValid] = useState(true);
  const [dropDown, setDropDown] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
    setValid(true);
    // setActive(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      setValid(false);
      return;
    }
    if (isValid) {
      setSubmitted(true)
      setQuery("")
    }
    
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${debouncedQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDropDown(data);

      } catch (error) {
        console.error(error);
      }
    };
    
     if(debouncedQuery){
      fetchResults();
     }
    
  }, [debouncedQuery]);
  return (
    <header className="header-wrapper">
      <form onSubmit={handleSubmit} autoComplete="off">
        <fieldset className="field">
          <label htmlFor="search"></label>
          <input
            type="search"
            id="search"
            placeholder="username"
            value={query}
            onChange={handleChange}
            className={`form-input`}
          />
          <button type="submit" className="search-btn">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
          </button>
        </fieldset>
        {!isValid && (
          <span className="error-message">Please provide a valid userame</span>
        )}
      </form>
      {debouncedQuery && (
        <div className="drop-down-wrapper" onClick={handleSubmit}>
          <figure className="header-img-wrapper">
            <img
              src={dropDown?.avatar_url}
              alt={`Profile picture of ${dropDown?.name}`}
              className="header-img"
            />
          </figure>
          <div className="header-text">
            <p className="header-name">{dropDown?.name}</p>
            <span className="header-bio">{dropDown?.bio}</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Search;
