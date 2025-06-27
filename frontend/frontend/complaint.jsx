import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/complaints', form);
    alert('Complaint submitted!');
  } catch (error) {
    alert('Submission failed');
  }
};
