import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // You can remove this if you're moving to Tailwind CSS

export default function Mongo_Profile() {
  const emaill = localStorage.getItem('userEmail');
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: emaill,
    phone: '',
    bio: ''
  });

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not available"
      });
    }
  }, []);

  useEffect(() => {
    if (!profileData.email) return;
    const checkProfile = async () => {
      try {
        const response = await axios.get(`https://f680-119-160-199-91.ngrok-free.app/check_profile/${profileData.email}`, {
          headers: { 'ngrok-skip-browser-warning': true }
        });
        if (response.data && response.data.profileExists) {
          setIsProfileCreated(true);
        }
      } catch (error) {
        console.error('Error checking profile', error);
      }
    };
    checkProfile();
  }, [profileData.email]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/create_profile',
        {
          uuid: profileData.email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          latitude: location.latitude,
          longitude: location.longitude,
          email: profileData.email,
          phone: profileData.phone,
          bio: profileData.bio
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('profileCreated', 'true');
      setIsProfileCreated(true);
      navigate(`/profilee`);
    } catch (error) {
      console.error('Error creating profile:', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    }
  };

  if (isProfileCreated) {
    return <h2 className="text-center text-2xl font-semibold text-green-600">Your profile is already created</h2>;
  }

  return (
    <div className="profile-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">Create Your Profile</h1>
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter Your First Name"
            value={profileData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Enter Your Last Name"
            value={profileData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            readOnly
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Your Phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Bio:</label>
          <textarea
            name="bio"
            placeholder="Enter Your Bio"
            value={profileData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>
        </div>
        <button
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          type="submit"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
