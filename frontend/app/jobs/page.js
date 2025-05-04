// 'use client';

// import { useEffect, useState } from 'react';
// import styles from './Jobs.module.css';
// import jobsData from './mockJobs.json';
// import LoggedInHeader from '../components/LoggedinHeader';
// import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

// export default function JobsPage() {
//   const { jobs } = jobsData;
//   const [searchQuery, setSearchQuery] = useState('');
//   const [savedIds, setSavedIds] = useState([]);

//   // Currently using localStorage
//   // When using MongoDB:
//   // Replace this with a call to your backend API (e.g., /api/favorites?userId=xyz)
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('favorites')) || [];
//     const ids = saved.map((job) => job._id);
//     setSavedIds(ids);
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

// // Currently using localStorage
// // When using MongoDB:
// // Replace this with a POST to your backend API (e.g., POST /api/favorites)
// const handleSaveToFavorites = async (job) => {
//   const existing = JSON.parse(localStorage.getItem('favorites')) || [];
//   const isSaved = existing.some((j) => j._id === job._id);

//   let updated;

//   if (isSaved) {
//     // Remove from favorites if already saved
//     updated = existing.filter((j) => j._id !== job._id);
//   } else {
//     // Add to favorites if not already saved
//     updated = [...existing, job];
//   }

//   localStorage.setItem('favorites', JSON.stringify(updated));
//   setSavedIds(updated.map((j) => j._id));

//   // To use MongoDB:
//   // await fetch('/api/favorites', {
//   //   method: isSaved ? 'DELETE' : 'POST',
//   //   headers: { 'Content-Type': 'application/json' },
//   //   body: JSON.stringify({ userId: user.email, job })
//   // });
// };


//   const filteredJobs = jobs.filter((job) => {
//     const combinedText = `${job.job_title} ${job.employer_name} ${job.job_description}`.toLowerCase();
//     return combinedText.includes(searchQuery);
//   });

//   return (
//     <>
//       <LoggedInHeader />
//       <div className={styles.container}>
//         <h1 className={styles.pageTitle}>Job Listings</h1>

//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Search jobs..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//         </div>

//         <div className={styles.gapBelowSearch}></div>

//         <div className={styles.jobGrid}>
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job, index) => (
//               <div key={index} className={styles.jobCard}>
//                 <h2 className={styles.jobTitle}>{job.job_title}</h2>
//                 <h3 className={styles.employer}>{job.employer_name}</h3>
//                 <p className={styles.description}>
//                   {job.job_description.substring(0, 300)}...
//                 </p>

//                 <div className={styles.buttonGroup}>
//                   <a
//                     href={job.job_apply_link}
//                     className={styles.applyButton}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Apply Now
//                   </a>

//                   <button
//   onClick={() => handleSaveToFavorites(job)}
//   className={styles.saveButton}
//   title={savedIds.includes(job._id) ? 'Saved' : 'Save to favorites'}
// >
//   {savedIds.includes(job._id) ? (
//     <FaBookmark size={18} color="#0070f3" />
//   ) : (
//     <FaRegBookmark size={18} color="#333" />
//   )}
// </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className={styles.noResults}>No jobs found.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import styles from './Jobs.module.css';
import LoggedInHeader from '../components/LoggedinHeader';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  // Fetch jobs from backend instead of using mockJobs.json
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:9999/api/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs:', err.message);
      }
    };

    fetchJobs();
  }, []);

  // Load saved favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    const ids = saved.map((job) => job._id);
    setSavedIds(ids);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSaveToFavorites = async (job) => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    const isSaved = existing.some((j) => j._id === job._id);

    let updated;

    if (isSaved) {
      updated = existing.filter((j) => j._id !== job._id);
    } else {
      updated = [...existing, job];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setSavedIds(updated.map((j) => j._id));
  };

  const filteredJobs = jobs.filter((job) => {
    const combinedText = `${job.title} ${job.company} ${job.description}`.toLowerCase();
    return combinedText.includes(searchQuery);
  });

  return (
    <>
      <LoggedInHeader />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Job Listings</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.gapBelowSearch}></div>

        <div className={styles.jobGrid}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={index} className={styles.jobCard}>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <h3 className={styles.employer}>{job.employer_name}</h3>
                <p className={styles.description}>
                  {job.description.substring(0, 300)}...
                </p>

                <div className={styles.buttonGroup}>
                  <a
                    href={job.job_apply_link}
                    className={styles.applyButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>

                  <button
                    onClick={() => handleSaveToFavorites(job)}
                    className={styles.saveButton}
                    title={savedIds.includes(job._id) ? 'Saved' : 'Save to favorites'}
                  >
                    {savedIds.includes(job._id) ? (
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
