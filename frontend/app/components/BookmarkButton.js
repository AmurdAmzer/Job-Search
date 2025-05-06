'use client';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

export default function BookmarkButton({ job, savedIds, setSavedIds }) {
  const sourceId = job.sourceId;
  const isSaved = savedIds.includes(sourceId);

  const handleClick = async () => {
    const stored = JSON.parse(localStorage.getItem('user'));
    const userId = stored?.user?._id || stored?.user?.id;

    if (!userId || !sourceId) {
      alert('Missing user ID or job ID.');
      return;
    }

    if (isSaved) {
      try {
        const res = await fetch(`http://localhost:9999/api/favorites/${userId}/${encodeURIComponent(sourceId)}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          const errorData = await res.text();
          console.error('❌ Failed to remove favorite from backend:', errorData);
          return;
        }

        setSavedIds((prev) => prev.filter((id) => id !== sourceId));
      } catch (err) {
        console.error('❌ Request error while removing favorite:', err);
      }
    } else {
      try {
        await fetch('http://localhost:9999/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            sourceId,
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
          }),
        });

        setSavedIds((prev) => [...prev, sourceId]);
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
