import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import BlurNavbar from "./Webiste_com/Navbar/BlurNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Webiste_com/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchByAuthor from "./Webiste_com/Exchange/SearchByAuthor";
import SearchByTitle from "./Webiste_com/Exchange/SearchByTitle";
import SearchByCategory from "./Webiste_com/Exchange/SearchByCategory";
import Profile from "./components/Profile/Profile";
import Exchange from "./Webiste_com/Exchange/Exchange";
import RegistrationPage from "./Webiste_com/RegistrationPage/RegistrationPage";
import ChatPage from "./Webiste_com/ChatPage/ChatPage";
import Mongo_Profile from "./Webiste_com/Profile_mongo/Mongo_Profile";
import Profile_Show from "./Webiste_com/Profile_Show/Profile_Show";
import UpdateProfile from "./Webiste_com/UpdateProfile.js/UpdateProfile";
import Explore from "./Webiste_com/Explore/Explore";


function App() {
  // const APP_ID = process.env.REACT_APP_APP_ID;
  
  // const USER_ID = process.env.REACT_APP_USER_ID;
  // const NICKNAME = process.env.REACT_APP_NICKNAME;
  // const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
  return (
    <BrowserRouter>
    
     <BlurNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
             
              <UI />
              <Loader />
              <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
                <group position-y={0}>
                  <Suspense fallback={null}>
                    <Experience />
                  </Suspense>
                </group>
              </Canvas>
            </>
          }
        />
        <Route path="/profilee" element={<Profile_Show />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Author" element={<SearchByAuthor/>} />
        <Route path="/Title" element={<SearchByTitle/>}/>
        <Route path="/Chatting" element={<RegistrationPage/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Category" element={<SearchByCategory/>}/>
        <Route path="/Book_Profile" element={<Mongo_Profile/>}/>
        <Route path="/update_profile/:userId" element={<UpdateProfile />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
