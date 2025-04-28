'use client';

import { useState } from 'react';
import styles from './Jobs.module.css';
import jobsData from './mockJobs.json'; // Adjust path if needed
import Header from '../components/Header';
import LoggedInHeader from '../components/LoggedinHeader';

export default function JobsPage() {
  const { jobs } = jobsData;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredJobs = jobs.filter((job) => {
    const combinedText = `${job.job_title} ${job.employer_name} ${job.job_description}`.toLowerCase();
    return combinedText.includes(searchQuery);
  });

  return (
    <div className={styles.container}>
        <LoggedInHeader></LoggedInHeader>
      <h1 className={styles.pageTitle}>Job Listings</h1>

      {/* 🔍 Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      {/* ⬇ Big Gap */}
      <div className={styles.gapBelowSearch}></div>

      {/* 📄 Job Cards Grid */}
      <div className={styles.jobGrid}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className={styles.jobCard}>
              <h2 className={styles.jobTitle}>{job.job_title}</h2>
              <h3 className={styles.employer}>{job.employer_name}</h3>
              <p className={styles.description}>
                {job.job_description.substring(0, 300)}...
              </p>
              <a
                href={job.job_apply_link}
                className={styles.applyButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No jobs found.</p>
        )}
      </div>
    </div>
  );
}
