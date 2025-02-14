import { gql, useQuery } from "@apollo/client";


const GET_JOBS = gql`
    query GetJobs {
        jobs {
            id
            title
            company
            location
        }
    }`;

   const JobList = () => {
        const { loading, error, data } = useQuery(GET_JOBS);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        return (
            <div>
                <h2>Job Listings</h2>
                <ul>
                    {data.jobs.map((job: any) =>(
                        <li key={job.id}>
                            <strong>{job.title}</strong> at {job.company} ({job.location})
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    export default JobList;