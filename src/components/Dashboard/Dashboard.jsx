import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to the /dashboard endpoint, passing credentials (session/cookies)
        const response = await axios.get('http://localhost:5000/dashboard', {
          withCredentials: true, // Include credentials (cookies) in the request
        });

        setUser(response.data.user_id); // Set the user ID from the response
      } catch (error) {
        // Handle unauthorized access (401) or other errors
        if (error.response && error.response.status === 401) {
          alert("Please log in first.");
          navigate('/'); // Redirect to login if the user is not logged in
        } else {
          alert(error.response ? error.response.data.error : 'An error occurred');
        }
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while fetching data
  }

  if (!user) {
    return <div>You are not authorized to view this page. Redirecting to login...</div>;
  }

  return <div>Welcome to your dashboard, User ID: {user}</div>;
};

export default Dashboard;
