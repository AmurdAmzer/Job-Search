"use client";

import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import LoggedInHeader from "../components/LoggedinHeader";
import styles from "./Jobs.module.css";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ADDED: Fetch saved favorites from MongoDB using logged-in user ID
  useEffect(() => {
    const fetchSaved = async () => {
      const user = JSON.parse(localStorage.getItem("user")); 
      const userId = user?._id; 

      if (!userId) return;

      try {
        const res = await fetch(
          `http://localhost:9999/api/favorites/${userId}`
        );
        const data = await res.json();
        const ids = data.favorites.map((job) => job.sourceId || job.jobId);
        setSavedIds(ids);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchSaved();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:9999/api/search-jobs?queryText=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
      const result = await response.json();
      console.log("📦 Search results:", result);

      setJobs(result.jobs || []);
    } catch (err) {
      console.error("❌ Search failed:", err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ MODIFIED: Save favorite to MongoDB instead of localStorage
  const handleSaveToFavorites = async (job) => {
    const stored = JSON.parse(localStorage.getItem("user"));
    const userId = stored?.user?._id || stored?.user?.id; //updated to access nested structure

    if (!userId) {
      alert("You must be logged in to save favorites.");
      return;
    }

    const jobId = job._id || job.job_id || job.sourceId;
    const isSaved = savedIds.includes(jobId);

    if (isSaved) {
      //call DELETE endpoint if backend supports it
      setSavedIds((prev) => prev.filter((id) => id !== jobId));
      return;
    }

    try {
      await fetch("http://localhost:9999/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          jobId,
          title: job.title || job.job_title,
          company: job.company || job.employer_name,
          location: job.location || "Remote",
          description: job.description || job.job_description || "",
          requirements: [],
          salary: {},
          jobType: "Remote",
          applicationDeadline: null,
          externalUrl: job.externalUrl || job.job_apply_link || "#",
          source: "Manual",
          sourceId: jobId,
        }),
      });

      setSavedIds((prev) => [...prev, jobId]);
    } catch (err) {
      console.error("❌ Failed to save favorite:", err);
    }
  };

  return (
    <>
      <LoggedInHeader />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Job Listings</h1>

        <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </div>
        </form>

        <div className={styles.gapBelowSearch}></div>

        {loading && <p className={styles.loading}>Loading jobs...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.jobGrid}>
          {jobs.length > 0 ? (
            jobs.map((job, index) => {
              const jobId = job._id || job.job_id || job.sourceId;
              const isSaved = savedIds.includes(jobId); // UPDATED

              return (
                <div key={index} className={styles.jobCard}>
                  <h2 className={styles.jobTitle}>
                    {job.title || job.job_title}
                  </h2>
                  <h3 className={styles.employer}>
                    {job.company || job.employer_name}
                  </h3>
                  <p className={styles.description}>
                    {(job.description || job.job_description)?.substring(
                      0,
                      300
                    )}
                    ...
                  </p>

                  <div className={styles.buttonGroup}>
                    <a
                      href={job.externalUrl || job.job_apply_link || "#"}
                      className={styles.applyButton}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </a>
                    <button
                      onClick={() => handleSaveToFavorites(job)}
                      className={styles.saveButton}
                      title={isSaved ? "Saved" : "Save to favorites"}
                    >
                      {isSaved ? (
                        <FaBookmark size={18} color="#0070f3" />
                      ) : (
                        <FaRegBookmark size={18} color="#333" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.noResults}>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
}
