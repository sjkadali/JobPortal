import { gql, useMutation } from "@apollo/client";
import { useState } from "react";


const CREATE_JOB = gql`
    mutation CreateJob($title: String!, $description: String!, $company: String!, $location: String!) {
        createJob(title: $title, description: $description, company: $company, location: $location) {
            id
            title
        }
    }
`;

const CreateJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const [createJob] = useMutation(CREATE_JOB);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // Validation Checks
    if (!title.trim() || !description.trim() || !company.trim() || !location.trim()) {
      setError('All fields are required.');
      return;
    }

    if (title.length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }

    if (description.length < 4) {
      setError('Description must be at least 10 characters.');
      return;
    }

    setError(''); // Clear errors if all checks pass

        await createJob({variables: { title, description, company, location } });
        setTitle('');
        setDescription('');
        setCompany('');
        setLocation('');
    };

    return (
       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Post a New Job</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        className="border p-2 w-full mb-2"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />
      <input
        className="border p-2 w-full mb-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <button
        type="submit"
        className={`p-2 rounded text-white ${!title || !description || !company || !location ?
             'bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled= {title.length ===0 || description.length ===0 || company.length ===0 ||
           location.length ===0}
      >
        Post Job
      </button>
    </form>
    )
}   

export default CreateJob;