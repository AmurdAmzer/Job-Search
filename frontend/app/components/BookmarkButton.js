'use client';

import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

export default function BookmarkButton({ job, savedIds, setSavedIds }) {
  const jobId = job._id || job.job_id || job.sourceId;
  const isInitiallySaved = savedIds.includes(jobId);
  const [isSaved, setIsSaved] = useState(isInitiallySaved);

  useEffect(() => {
    setIsSaved(savedIds.includes(jobId));
  }, [savedIds, jobId]);

  const handleClick = async () => {
    const stored = JSON.parse(localStorage.getItem('user'));
    const userId = stored?.user?._id || stored?.user?.id;

    if (!userId) {
      alert('You must be logged in to save favorites.');
      return;
    }

    if (isSaved) {
      // DELETE from backend
      try {
        await fetch(`http://localhost:9999/api/favorites/${userId}/${jobId}`, {
          method: 'DELETE',
        });
        setSavedIds((prev) => prev.filter((id) => id !== jobId));
      } catch (err) {
        console.error('❌ Failed to remove favorite:', err);
      }
    } else {
      // Save to backend
      try {
        await fetch('http://localhost:9999/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            jobId,
            title: job.title || job.job_title,
            company: job.company || job.employer_name,
            location: job.location || 'Remote',
            description: job.description || job.job_description || '',
            requirements: [],
            salary: {},
            jobType: 'Remote',
            applicationDeadline: null,
            externalUrl: job.externalUrl || job.job_apply_link || '#',
            source: 'Manual',
            sourceId: jobId,
          }),
        });

        setSavedIds((prev) => [...prev, jobId]);
      } catch (err) {
        console.error('❌ Failed to save favorite:', err);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {isSaved ? (
        <FaBookmark size={18} color="#0070f3" />
      ) : (
        <FaRegBookmark size={18} color="#333" />
      )}
    </button>
  );
}
