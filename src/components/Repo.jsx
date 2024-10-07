import React, { useEffect, useState } from "react";
import "../css/repo.css";
import fork from "../assets/images/fork.svg";
import license from "../assets/images/license.svg";
import star from "../assets/images/star.svg";

function Repo({ debouncedQuery, isSubmitted, setSubmitted }) {
  const [repo, setRepo] = useState([]);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDefault = async () => {
      const url = "https://api.github.com/users/github/repos";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRepo(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDefault();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `https://api.github.com/users/${debouncedQuery}/repos`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRepo(data);
        setSubmitted(false);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setSubmitted(false);
      }
    };

    if (isSubmitted) {
      fetchResults();
    }
  }, [isSubmitted]);

  const handleRepos = () => {
    setShowAllRepos(!showAllRepos);
  };
  const dataToShow = showAllRepos ? repo : repo.slice(0, 4);
  return (
    <section className="repo-container">
      <div className="repos-wrapper">
        {loading && <p>Fetching data...</p>}
        {error && <p>Error🚫:{error}</p>}
        {dataToShow.map((repo) => {
          // Given data
          const updatedAt = repo?.updated_at;

          // Convert to Date object
          const updatedDate = new Date(updatedAt);

          // Get the current date
          const currentDate = new Date();

          // Calculate the difference in milliseconds
          const differenceInMilliseconds = currentDate - updatedDate;

          // Convert the difference from milliseconds to days
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );

          return (
            <a
              key={repo.id}
              href={repo?.html_url}
              target="_blank"
              className="repo-card"
            >
              <h2 className="repo-name">{repo?.name}</h2>
              <p className="repo-parag">{repo?.description}</p>
              <ul className="repo-details-wrapper">
                {repo?.license && (
                  <li className="repo-item">
                    <img
                      src={license}
                      alt={`License from ${repo?.license?.name}`}
                    />
                    {repo?.license?.key}
                  </li>
                )}
                <li className="repo-item">
                  <img src={fork} alt={`Icon for Number of forks`} />
                  {repo?.forks}
                </li>
                <li className="repo-item">
                  <img src={star} alt={`Star Icon`} />
                  {repo?.watchers}
                </li>
                <li className="repo-item update">{`Updated ${differenceInDays} days ago.`}</li>
              </ul>
            </a>
          );
        })}
      </div>
      <button type="button" className="repo-btn" onClick={handleRepos}>
        {setShowAllRepos ? "Collapse Repositories" : "View all repositories"}
      </button>
    </section>
  );
}

export default Repo;
