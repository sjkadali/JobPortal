import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 🔹 Hook to navigate pages

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    const endpoint = 'http://localhost:3000/graphql';
    const mutation = isRegister
      ? `mutation { register(email: "${email}", password: "${password}", name: "${name}") }`
      : `mutation { login(email: "${email}", password: "${password}") }`;

    try {
      const res = await axios.post(endpoint, { query: mutation });

      if (res.data.errors) {
        setError(res.data.errors[0].message);
      } else {
        if (isRegister) {
          alert('Registered successfully! You can now log in.');
          setIsRegister(false);
        } else {
          const authToken = res.data.data.login;
          localStorage.setItem('token', authToken); // Save token
          navigate('/jobs'); // 🔹 Redirect to job listings page
        }
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">{isRegister ? 'Register' : 'Login'}</h2>

      {error && <p className="text-red-500">{error}</p>}

      {isRegister && (
        <input className="border p-2 w-full mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      )}
      <input className="border p-2 w-full mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 w-full mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleSubmit}>
        {isRegister ? 'Register' : 'Login'}
      </button>

      <p className="text-sm mt-2">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <span className="text-blue-500 cursor-pointer ml-1" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  );
}
