'use client';

import { useRouter } from 'next/navigation';
import styles from '../favorites/Favorites.module.css';

export default function InterviewPrepButton({ jobId }) {
  const router = useRouter();

  const handleClick = () => {
    if (!jobId) {
      console.error('Missing jobId for interview prep');
      return;
    }
    router.push(`/interview-prep/${jobId}`);
  };

  return (
    <button onClick={handleClick} className={styles.applyButton}>
      Interview Preparation
    </button>
  );
}
