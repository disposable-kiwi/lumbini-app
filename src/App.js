import React, { Fragment, useState } from "react";
import CreatePostPage from "./components/CreatePostPage";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import SignInSide from "./components/routes/signin.routes";
import AllPosts from "./components/routes/AllPosts";
import { useContext } from "react";
import './App.scss';
import { AuthContext } from "./components/context/auth.context";

function App() {

  const { isAuth } = useContext(AuthContext);

  // {/* {isAuth ? <CreatePostPage/> : <SignInSide />} */}
  //     {/* <Routes>
  //       <Route path="/" element={<SignInSide />}
  //     </Routes> */}

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<SignInSide />} />
      <Route path="/allaffirms" element={<AllPosts/>}/>
      <Route path="/newaffirm" element={<CreatePostPage/>}/>
    </Routes>

  );
}

export default App;
