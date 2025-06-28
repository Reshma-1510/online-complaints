import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentHome = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status })
      .then(() => alert('Status Updated!'));
  };

  return (
    <div>
      <h2>Assigned Complaints</h2>
      <ul>
        {complaints.map(c => (
          <li key={c._id}>
            {c.title} - {c.status}
            <button onClick={() => updateStatus(c._id, 'Resolved')}>Mark as Resolved</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentHome;
