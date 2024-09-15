import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import React from 'react';

function Exchange() {
  const colorSet = {
    '--sendbird-light-primary-500': '#066858',
    '--sendbird-light-primary-400': '#027d69',
    '--sendbird-light-primary-300': '#259c72',
    '--sendbird-light-primary-200': '#69c085',
    '--sendbird-light-primary-100': '#a8e2ab',
}
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SendbirdApp
        appId={'45C3AE12-D343-42E2-8E85-4094530EE14D'} // Ensure this matches your Sendbird dashboard app ID
        userId={'111'} // Replace this with a valid user ID from Sendbird
        // Optionally, specify a nickname
        nickname={'Tester'} // You can replace this with a dynamic user nickname
        profileUrl={'https/tester'}
        accessToken={'46e643af7e641936347472945649a12f20afbf5b'}
        theme="light" // Use 'dark' for dark mode if needed
        colorSet={colorSet}
      />
    </div>
  );
}

export default Exchange;
