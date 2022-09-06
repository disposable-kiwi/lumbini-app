import React, { Fragment, useState } from "react";
import CreatePostPage from "./components/CreatePostPage";
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import SignInSide from "./components/routes/signin.routes";
import AllPosts from "./components/routes/AllPosts";
import { useContext } from "react";
import './App.scss';
import { AuthContext } from "./components/context/auth.context";

function App() {

  let navigate = useNavigate();

  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);

  // {/* {isAuth ? <CreatePostPage/> : <SignInSide />} */}
  //     {/* <Routes>
  //       <Route path="/" element={<SignInSide />}
  //     </Routes> */}

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/newaffirm" /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuth ? <Navigate to="/newaffirm" /> : <SignInSide />} />

      <Route path="/allaffirms" element={<AllPosts/>}/>
      <Route path="/newaffirm" element={<CreatePostPage/>}/>
      {/* <Route path="/allaffirms" element={isAuth? <AllPosts/>:  <Navigate to="/login" />}/>
      <Route path="/newaffirm" element={isAuth? <CreatePostPage/>:  <Navigate to="/login" /> }/> */}
    </Routes>
  );
}

export default App;
