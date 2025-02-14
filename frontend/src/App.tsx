import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import JobListings from './components/JobListings'; // Import job listing component
import CreateJob from './components/CreateJob';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/post-job" element={<CreateJob />} />
      </Routes>
    </Router>
  );
}
