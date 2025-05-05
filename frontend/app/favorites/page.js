'use client';

import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import LoggedInHeader from '../components/LoggedinHeader';
import BookmarkButton from '../components/BookmarkButton';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [savedIds, setSavedIds] = useState([]); // Track saved IDs
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      const stored = JSON.parse(localStorage.getItem('user'));
      const userId = stored?.user?._id || stored?.user?.id;

      if (!userId) {
        console.error('No user ID found in localStorage');
        return;
      }

      try {
        const res = await fetch(`http://localhost:9999/api/favorites/${userId}`);
        const data = await res.json();
        setFavorites(data);
        const ids = data.map((job) => job.sourceId || job.jobId); // Extract IDs
        setSavedIds(ids);
      } catch (err) {
        console.error('❌ Failed to fetch favorites:', err);
      }
    };

    fetchFavorites();
  }, []);

  const filteredFavorites = favorites.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <LoggedInHeader />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Saved Jobs</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search saved jobs..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.gapBelowSearch} />

        {filteredFavorites.length === 0 ? (
          <p className={styles.noResults}>No matching saved jobs found.</p>
        ) : (
          <div className={styles.jobGrid}>
            {filteredFavorites.map((job) => {
              const jobId = job.sourceId || job.jobId;
              return (
                <div key={job._id} className={styles.jobCard}>
                  <h2 className={styles.jobTitle}>{job.title}</h2>
                  <p className={styles.employer}>{job.company}</p>
                  <p className={styles.savedDate}>
                    Saved on {new Date(job.savedAt).toLocaleDateString()}
                  </p>

                  <div className={styles.buttonGroup}>
  <div className={styles.buttonRow}>
    <a
      href={job.externalUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.applyButton}
    >
      Apply Now
    </a>
    <BookmarkButton
      job={job}
      savedIds={savedIds}
      setSavedIds={(updatedIds) => {
        setSavedIds(updatedIds);
        if (!updatedIds.includes(jobId)) {
          setFavorites((prev) =>
            prev.filter((j) => (j.sourceId || j.jobId) !== jobId)
          );
        }
      }}
    />
  </div>
</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
