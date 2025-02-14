import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">JobPortal</Link>
      </div>

      {/* Links */}
      <div className="space-x-4">
        <Link to="/jobs" className="hover:underline">Job Listings</Link>
        {token ? (
          <>
            <Link to="/post-job" className="hover:underline">Post Job</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
