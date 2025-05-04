'use client'

import React, { useEffect, useState } from 'react'
import styles from './Favorites.module.css'
import LoggedInHeader from '../components/LoggedinHeader'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchFavorites() {
      const res = await fetch('/mockFavorites.json')
      const data = await res.json()
      setFavorites([data.favorite]) // Add more later as needed
    }

    fetchFavorites()
  }, [])

  const filteredFavorites = favorites.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.employer.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            {filteredFavorites.map((job) => (
              <div key={job._id} className={styles.jobCard}>
                <h2 className={styles.jobTitle}>{job.jobTitle}</h2>
                <p className={styles.employer}>{job.employer}</p>
                <p className={styles.savedDate}>
                  Saved on {new Date(job.savedAt).toLocaleDateString()}
                </p>

                <div className={styles.buttonGroup}>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.applyButton}
                  >
                    Apply Now
                  </a>
                  <a
                    href="/interview-prep"
                    className={styles.applyButton}
                  >
                    Interview Prep
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}