// components/user/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to="/complaint">Submit Complaint</Link><br />
      <Link to="/status">View Status</Link>
    </div>
  );
};

export default HomePage;
