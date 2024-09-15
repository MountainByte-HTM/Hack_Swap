import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile_Show() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [givenList, setGivenList] = useState([]);
  const [takenList, setTakenList] = useState([]);
  const [error, setError] = useState(null);
  const [queue, setQueue] = useState(null);
  const [isQueueVisible, setIsQueueVisible] = useState(false); // State to track if the queue is visible
  const navigate = useNavigate();
  const emaill = localStorage.getItem('userEmail');

  const handleGivenList = async () => {
    if (emaill) {
      try {
        const response = await axios.get(
          `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/get_given_list/${emaill}`,
          {
            headers: {
              'ngrok-skip-browser-warning': true,
            },
          }
        );
        console.log('Given Queue Response:', response.data.given_list);
        setGivenList(response.data.given_list);
      } catch (error) {
        console.error('Error fetching given list:', error);
        setError('Error fetching given list. Please try again later.');
      }
    }
  };

  const handleLibrary = async () => {
    if (!emaill) {
      console.log("Email is undefined or empty");
      return;
    }
    
    // Toggle the visibility of the queue
    if (isQueueVisible) {
      setIsQueueVisible(false);
      setQueue(null); // Clear the queue when hiding
    } else {
      try {
        const response = await axios.post(
          `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/get_user_library`, 
          { user_uuid: emaill },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        console.log("Library data:", response.data.library); 
        setQueue(response.data.library);
        setIsQueueVisible(true); // Show the queue
      } catch (error) {
        console.error('Error fetching user library:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleTakenList = async () => {
    if (emaill) {
      try {
        const response = await axios.get(
          `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/get_taken_list/${emaill}`,
          {
            headers: {
              'ngrok-skip-browser-warning': true,
            },
          }
        );
        console.log('Taken Queue Response:', response.data);
        setTakenList(response.data.taken_list);
      } catch (error) {
        console.error('Error fetching taken list:', error);
        setError('Error fetching taken list. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://2ba3-2401-4900-50ab-a2ec-f1dc-b1b5-e703-2f8c.ngrok-free.app/get_profile/${emaill}`, 
          {
            headers: { 'ngrok-skip-browser-warning': true },
          }
        );
        setProfileData(response.data.profile);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [emaill]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!profileData) return null;

  const { first_name, last_name, latitude, longitude, email, phone } = profileData;

  const handleUpdateProfile = () => {
    navigate(`/update_profile/${emaill}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-lg w-full p-8">
        <div className="text-center mb-6">
          {/* Placeholder for profile image */}
          <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">
            Hi {first_name} {last_name}
          </h2>
          <p className="text-gray-600 mt-2">{email}</p>
          <p className="text-gray-600 mb-6">{phone}</p>
        </div>

        {/* Location Section */}
        <div className="mt-6 mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          {latitude && longitude ? (
            <p className="text-gray-700 mt-2">
              Latitude: {latitude}, Longitude: {longitude}
            </p>
          ) : (
            <p className="text-gray-700 mt-2">Location not available</p>
          )}
        </div>

        {/* Queue Sections */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">My Queues</h3>
          <div className="mt-4">
            <button
              onClick={handleGivenList}
              className="bg-indigo-600 text-white px-4 py-2 my-2 rounded-md hover:bg-indigo-700 transition"
            >
              Given Queue
            </button>
            <button
              onClick={handleTakenList}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition "
            >
              Taken Queue
            </button>
          </div>
          {/* Display Books */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Given Books</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {givenList.length > 0 ? (
                givenList.map((book, index) => (
                  <li key={index} className="mb-2">
                    {book}
                  </li>
                ))
              ) : (
                <li>No books in given queue</li>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Taken Books</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {takenList.length > 0 ? (
                takenList.map((book, index) => (
                  <li key={index} className="mb-2">
                    {book}
                  </li>
                ))
              ) : (
                <li>No books in taken queue</li>
              )}
            </ul>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8">
          <button
            onClick={handleUpdateProfile}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Update Profile
          </button>
        </div>

        {/* Library Section */}
        <div className="mt-4">
          <button
            onClick={handleLibrary}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isQueueVisible ? 'Hide Library' : 'My Library'}
          </button>
        </div>

        {isQueueVisible && (
          <div className="mt-4">
            <ul className="list-disc list-inside mt-4 text-gray-700">
              {queue && queue.length > 0 ? (
                queue.map((book, index) => (
                  <li key={index} className="mb-2">
                    <h1>Authors : {book.authors}</h1>
                    <h1>Categories : {book.categories}</h1>
                    <h1>Title : {book.title}</h1>
                    <h1>Book Id : {book.book_id}</h1>
                    <h1>Book Language : {book.lang}</h1>
                  </li>
                ))
              ) : (
                <li>No books in library</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
