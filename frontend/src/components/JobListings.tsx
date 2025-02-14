import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobListings() {
  const [jobs, setJobs] = useState([]);

  type Job = { id: number; title: string };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.post('http://localhost:3000/graphql', {
        query: `query { jobs { id title company location } }`,
      });
      setJobs(res.data.data.jobs);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
      <ul>
        {jobs && jobs.map((job) => (
          <li key={job.id} className="border p-2 mb-2">
            <strong>{job.title}</strong> at {job.company} ({job.location})
          </li>
        ))}
      </ul>
    </div>
  );
}
