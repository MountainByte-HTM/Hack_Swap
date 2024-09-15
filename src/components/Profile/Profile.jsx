// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";
// import './Profile_style.css';  // Importing the CSS file

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     isAuthenticated && (
//       <div className="profile-container">
//         <img src={user.picture} alt={user.name} className="profile-picture" />
//         <h2 className="profile-name">{user.name}</h2>
//         <p className="profile-email">{user.email}</p>
//         <h1 className="profile-id">{user.sub}</h1>
//         {console.log(user)}
//       </div>
//     )
//   );
// };

// export default Profile;
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import './Profile_style.css';  // Importing the CSS file

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [bio, setBio] = useState('');  // State to store bio content
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('userEmail', user.email);
    }
  }, [isAuthenticated, user]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleEditorChange = (content) => {
    setBio(content);  // Updates bio with TinyMCE content
  };

  return (
    isAuthenticated && (
      <div className="profile-container">
        {/* Profile details */}
        <img src={user.picture} alt={user.name} className="profile-picture" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <h1 className="profile-id">{user.sub}</h1>
        
        {/* TinyMCE editor for editing bio */}
        <div className="editor-container">
          <h3>Edit Your Bio:</h3>
          <Editor
            apiKey="9dopmv30eon1suf957bg4u13wgbzle3vhhp11ctd4wx7aah8"
            value={bio}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
          />
        </div>

        {/* Displaying the edited bio */}
        <div className="bio-content">
          <h3>Your Bio:</h3>
          <div dangerouslySetInnerHTML={{ __html: bio }} />
        </div>

        {console.log(user)}  {/* Logging user details */}
      </div>
    )
  );
};

export default Profile;
