import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { App as SendbirdApp } from '@sendbird/uikit-react'; // Correct import
import '@sendbird/uikit-react/dist/index.css';

const sb = SendbirdChat.init({
  appId: '7D0C9372-4276-4A0D-A358-60C65A49E30E', // Replace with your Sendbird App ID
  modules: [new GroupChannelModule()],
});

const ChatPage = () => {
  const { state } = useLocation();
  const userId = state?.userId || ''; // Get the userId passed from RegistrationPage
  const [channelUrl, setChannelUrl] = useState('');

  useEffect(() => {
    if (userId) {
      createChatChannel(userId); // Automatically create/join chat on load
    }
  }, [userId]);

  const createChatChannel = async (userId) => {
    try {
      // Automatically create or join a distinct channel with the logged-in user
      const params = {
        invitedUserIds: [userId], // Chat with yourself or you can add any other user here
        isDistinct: true,
      };

      const channel = await sb.groupChannel.createChannel(params);
      setChannelUrl(channel.url); // Set the channel URL to load the chat
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  // Render Sendbird chat interface if the channel is available
  if (channelUrl) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <SendbirdApp
          appId="7D0C9372-4276-4A0D-A358-60C65A49E30E" // Replace with your Sendbird App ID
          userId={userId}
          channelUrl={channelUrl}
        />
      </div>
    );
  }

  return <div>Loading chat...</div>; // Show loading while chat is being initialized
};

export default ChatPage;

// 45C3AE12-D343-42E2-8E85-4094530EE14D
// 7D0C9372-4276-4A0D-A358-60C65A49E30E