document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const complaintForm = document.getElementById('complaintForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const userNameSpan = document.getElementById('userName');
    const complaintListDiv = document.getElementById('complaintList');
    const allComplaintsListDiv = document.getElementById('allComplaintsList');

    // Base URL for your backend API
    const API_URL = 'http://localhost:3000/api';

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (userNameSpan) {
        const user = localStorage.getItem('user');
        if (user) {
            userNameSpan.textContent = `Welcome, ${user}!`;
        }
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.loginEmail.value;
            const password = e.target.loginPassword.value;

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user.name);
                    localStorage.setItem('role', data.user.role);
                    alert('Login successful!');
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                } else {
                    alert(data.message || 'Login failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = e.target.registerName.value;
            const email = e.target.registerEmail.value;
            const password = e.target.registerPassword.value;

            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    // Switch to login tab
                    const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
                    loginTab.show();
                } else {
                    alert(data.message || 'Registration failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Complaint Submission
    if (complaintForm) {
        complaintForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = e.target.complaintTitle.value;
            const description = e.target.complaintDescription.value;

            try {
                const response = await fetch(`${API_URL}/complaints`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, description })
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Complaint submitted successfully!');
                    e.target.reset();
                    loadUserComplaints(); // Reload complaints
                } else {
                    alert(data.message || 'Failed to submit complaint.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Load user-specific complaints
    const loadUserComplaints = async () => {
        if (!complaintListDiv || !token) return;

        try {
            const response = await fetch(`${API_URL}/complaints/user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const complaints = await response.json();

            complaintListDiv.innerHTML = '';
            if (complaints.length === 0) {
                complaintListDiv.innerHTML = '<p>No complaints submitted yet.</p>';
            } else {
                complaints.forEach(complaint => {
                    const complaintElement = document.createElement('div');
                    complaintElement.className = 'complaint-item';
                    complaintElement.innerHTML = `
                        <h5>${complaint.title}</h5>
                        <p>${complaint.description}</p>
                        <p>Status: <span class="status-${complaint.status.toLowerCase()}">${complaint.status}</span></p>
                        <p><small>Submitted on: ${new Date(complaint.createdAt).toLocaleString()}</small></p>
                    `;
                    complaintListDiv.appendChild(complaintElement);
                });
            }
        } catch (error) {
            console.error('Error fetching complaints:', error);
            complaintListDiv.innerHTML = '<p class="text-danger">Failed to load complaints.</p>';
        }
    };

    // Load all complaints for admin
    const loadAllComplaints = async () => {
        if (!allComplaintsListDiv || role !== 'admin' || !token) return;

        try {
            const response = await fetch(`${API_URL}/complaints/admin`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const complaints = await response.json();

            allComplaintsListDiv.innerHTML = '';
            if (complaints.length === 0) {
                allComplaintsListDiv.innerHTML = '<p>No complaints have been submitted.</p>';
            } else {
                complaints.forEach(complaint => {
                    const complaintElement = document.createElement('div');
                    complaintElement.className = 'complaint-item mb-3';
                    complaintElement.innerHTML = `
                        <h5>${complaint.title}</h5>
                        <p><strong>User:</strong> ${complaint.userId.name}</p>
                        <p><strong>Email:</strong> ${complaint.userId.email}</p>
                        <p>${complaint.description}</p>
                        <p>Status: <span class="status-${complaint.status.toLowerCase()}">${complaint.status}</span></p>
                        <p><small>Submitted on: ${new Date(complaint.createdAt).toLocaleString()}</small></p>
                        <select class="form-select form-select-sm mt-2 complaint-status-select" data-id="${complaint._id}">
                            <option value="Pending" ${complaint.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${complaint.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Resolved" ${complaint.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    `;
                    allComplaintsListDiv.appendChild(complaintElement);
                });

                // Add event listener to status change selects
                document.querySelectorAll('.complaint-status-select').forEach(select => {
                    select.addEventListener('change', async (e) => {
                        const complaintId = e.target.dataset.id;
                        const newStatus = e.target.value;
                        try {
                            const response = await fetch(`${API_URL}/complaints/${complaintId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ status: newStatus })
                            });
                            const data = await response.json();
                            if (response.ok) {
                                alert('Complaint status updated successfully!');
                                loadAllComplaints(); // Reload the list to update styling
                            } else {
                                alert(data.message || 'Failed to update status.');
                            }
                        } catch (error) {
                            console.error('Error updating status:', error);
                            alert('An error occurred. Please try again.');
                        }
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching all complaints:', error);
            allComplaintsListDiv.innerHTML = '<p class="text-danger">Failed to load complaints.</p>';
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', handleLogout);
    }

    // Initial data loading based on the page
    if (window.location.pathname.endsWith('dashboard.html')) {
        if (!token) {
            window.location.href = 'index.html'; // Redirect to login if not authenticated
        }
        loadUserComplaints();
    } else if (window.location.pathname.endsWith('admin-dashboard.html')) {
        if (!token || role !== 'admin') {
            window.location.href = 'index.html'; // Redirect if not authenticated or not an admin
        }
        loadAllComplaints();
    }
});