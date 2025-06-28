// components/user/Status.jsx
import React from 'react';

const Status = () => {
  // Normally, fetch complaint statuses from backend API
  const dummyStatus = [
    { id: 1, title: 'Water Leakage', status: 'Resolved' },
    { id: 2, title: 'Street Light Issue', status: 'Pending' },
  ];

  return (
    <div>
      <h2>Your Complaints Status</h2>
      <ul>
        {dummyStatus.map((comp) => (
          <li key={comp.id}>
            {comp.title} - <strong>{comp.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Status;
