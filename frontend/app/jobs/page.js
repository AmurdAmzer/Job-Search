'use client';

import { useEffect, useState } from 'react';
import styles from './Jobs.module.css';
import LoggedInHeader from '../components/LoggedinHeader';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    const ids = saved.map((job) => job._id || job.job_id);
    setSavedIds(ids);
  }, []);

  // Fetch jobs from MongoDB on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs:', err);
        setError('Could not load jobs');
      }
    };
    fetchJobs();
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
        `http://localhost:9999/api/search-jobs?queryText=${encodeURIComponent(searchQuery.trim())}`
      );
      const result = await response.json();
      console.log('📦 Search results:', result);

      setJobs(result.jobs || []);
    } catch (err) {
      console.error('❌ Search failed:', err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFavorites = async (job) => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    const isSaved = existing.some((j) => (j._id || j.job_id) === (job._id || job.job_id));

    let updated;
    if (isSaved) {
      updated = existing.filter((j) => (j._id || j.job_id) !== (job._id || job.job_id));
    } else {
      updated = [...existing, job];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setSavedIds(updated.map((j) => j._id || j.job_id));
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
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>

        <div className={styles.gapBelowSearch}></div>

        {loading && <p className={styles.loading}>Loading jobs...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.jobGrid}>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={index} className={styles.jobCard}>
                <h2 className={styles.jobTitle}>{job.title || job.job_title}</h2>
                <h3 className={styles.employer}>{job.company || job.employer_name}</h3>
                <p className={styles.description}>
                  {(job.description || job.job_description)?.substring(0, 300)}...
                </p>

                <div className={styles.buttonGroup}>
                  <a
                    href={job.externalUrl || job.job_apply_link || '#'}
                    className={styles.applyButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>
                  <button
                    onClick={() => handleSaveToFavorites(job)}
                    className={styles.saveButton}
                    title={savedIds.includes(job._id || job.job_id) ? 'Saved' : 'Save to favorites'}
                  >
                    {savedIds.includes(job._id || job.job_id) ? (
                      <FaBookmark size={18} color="#0070f3" />
                    ) : (
                      <FaRegBookmark size={18} color="#333" />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
}
