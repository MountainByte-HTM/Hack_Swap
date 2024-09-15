import React, { useState } from 'react';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './RegistrationPage.css'; // Import the new CSS file

const RegistrationPage = () => {
  const { user } = useAuth0();
  const [name, setName] = useState(user.name ); // Ensure `user` exists
  const [email, setEmail] = useState(user.email); // Ensure `user` exists
  const [profileUrl, setProfileUrl] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const sb = SendbirdChat.init({
    appId: '7D0C9372-4276-4A0D-A358-60C65A49E30E', // Replace with your Sendbird App ID
    modules: [new GroupChannelModule()],
  });

  const generateUserId = (email) => {
    return `user_${email.split('@')[0]}`; // Create a unique user ID based on the email
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserId = generateUserId(email);
    setUserId(newUserId);

    try {
      // Connect to Sendbird and create a new user
      await sb.connect(newUserId);
      console.log('User logged in or created successfully.');

      // Update the user profile info
      await sb.updateCurrentUserInfo({
        nickname: name,
        profileUrl: profileUrl || 'https://example.com/default-profile.jpg',
      });

      console.log('User profile updated successfully.');

      // Redirect to the ChatPage after successful registration
      navigate('/chat', { state: { userId: newUserId } });
    } catch (error) {
      console.error('Error connecting user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register for Chat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profileUrl" className="block text-gray-700 font-semibold mb-2">Profile Picture URL</label>
            <input
              type="url"
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
