import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState({ status: '' });

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/complaints?status=${filter.status}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, [filter]);

  return (
    <div>
      <h2>All Complaints (Admin)</h2>
      <label>
        Filter by Status:
        <select onChange={(e) => setFilter({ status: e.target.value })}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label>
      <ul>
        {complaints.map(c => (
          <li key={c._id}>
            {c.title} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHome;
