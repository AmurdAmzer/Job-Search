'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './InterviewPrep.module.css';

export default function InterviewPrepPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [prepData, setPrepData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrep = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('user'));
        const userId = stored?.user?._id || stored?.user?.id;
  
        if (!userId) {
          setError('User not found.');
          setLoading(false);
          return;
        }
  
        const jobRes = await fetch(`https://job-search-1-k9sx.onrender.com/api/favorites/${userId}`);
        const jobs = await jobRes.json();
        const selectedJob = jobs.find(j => j._id === jobId || j.sourceId === jobId);
  
        if (!selectedJob) {
          setError('Job not found in favorites.');
          setLoading(false);
          return;
        }
  
        setJob(selectedJob);
  
        const prepRes = await fetch(`https://job-search-1-k9sx.onrender.com/api/interview-prep/${selectedJob._id || selectedJob.sourceId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            jobId: selectedJob._id || selectedJob.sourceId,
            jobTitle: selectedJob.title || selectedJob.job_title || 'Unknown Role'

          })
        });
  
        const result = await prepRes.json();
        console.log('🧠 Prep API Response:', result); //DEBUG LOG
  
        if (!prepRes.ok) throw new Error(result.error || 'Failed to generate prep');
  
        // Safely parse response
        const prep = result.prep;
        setPrepData({
          technicalQuestions: prep.technical_interview_questions,
          behavioralQuestions: prep.behavioral_interview_questions,
          studyTopics: prep.study_topics,
          studyResources: prep.online_study_resources
        });
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPrep();
  }, [jobId]);

  if (loading) return <p className={styles.loading}>Loading interview prep...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Interview Preparation: {job?.title}</h1>

      <section className={styles.section}>
        <h2>Technical Questions</h2>
        <ul>
          {prepData.technicalQuestions?.map((q, i) => <li key={i}>{q}</li>)}
        </ul>

        <h2>Behavioral Questions</h2>
        <ul>
          {prepData.behavioralQuestions?.map((q, i) => <li key={i}>{q}</li>)}
        </ul>

        <h2>Study Topics</h2>
        <ul>
          {prepData.studyTopics?.map((topic, i) => <li key={i}>{topic}</li>)}
        </ul>

        <h2>Study Resources</h2>
        <ul>
          {prepData.studyResources?.map((res, i) => (
            <li key={i}>
              <a href={res.url} target="_blank" rel="noreferrer">{res.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
