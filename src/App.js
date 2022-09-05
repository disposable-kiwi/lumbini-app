import React, { Fragment, useState } from "react";
import CreatePostPage from "./components/CreatePostPage";
import { Routers, Router } from 'react-router-dom';
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
    <Fragment>
      <SignInSide />
    </Fragment>
  );
}

export default App;
