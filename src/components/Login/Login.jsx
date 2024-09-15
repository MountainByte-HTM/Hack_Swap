// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email_or_phone: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', credentials);
     
//       alert(response.data.message);
//       console.log(response.data.user_id)
//       if (response.data.message === "Login successful!") {
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#eaeaea',
//   };

//   const formStyle = {
//     backgroundColor: '#ffffff',
//     padding: '2rem',
//     borderRadius: '10px',
//     boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
//     width: '350px',
//     textAlign: 'center',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '10px 0',
//     borderRadius: '5px',
//     border: '1px solid #d0d0d0',
//     fontSize: '1.1rem',
//   };

//   const buttonStyle = {
//     backgroundColor: '#28a745',
//     color: '#fff',
//     padding: '10px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     width: '100%',
//     fontSize: '1.2rem',
//   };

//   const buttonHoverStyle = {
//     backgroundColor: '#218838',
//   };

//   return (
//     <div style={containerStyle}>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <h2>Login</h2>
//         <input
//           name="email_or_phone"
//           value={credentials.email_or_phone}
//           onChange={handleChange}
//           placeholder="Email or Phone"
//           style={inputStyle}
//         />
//         <input
//           name="password"
//           type="password"
//           value={credentials.password}
//           onChange={handleChange}
//           placeholder="Password"
//           style={inputStyle}
//         />
//         <button
//           type="submit"
//           style={buttonStyle}
//           onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//           onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Login;