import React, { useState } from "react";
import CreatePostPage from "./CreatePostPage";
import SignInSide from "./components/routes/signin.routes";
import { useContext } from "react";
import { AuthContext } from "./components/context/auth.context";

function App() {

  const {isAuth} = useContext(AuthContext);
 
  return (
    <div>
      {isAuth ? <CreatePostPage/> : <SignInSide />}
      {/* <CreatePostPage/> */}
    </div>
  );
}

export default App;
