import React, { Fragment, useEffect, useState } from "react";
import CreatePostPage from "./components/CreatePostPage";
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import SignInSide from "./components/routes/signin.routes";
import AllPosts from "./components/routes/AllPosts";
import { useContext } from "react";
import './App.scss';
import { AuthContext } from "./components/context/auth.context";
import { UserContext } from "./components/context/user.context";
import { constants } from "buffer";

function App() {

  let navigate = useNavigate();

  const { isAuth, setAuth } = useContext(AuthContext);
  const { userId, setUserId } = useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:2218/checkToken')
    .then(res => res.json())
    .then((status)=>{
      if(status['alert']){
        setAuth(false);
        setUserId({});
        console.log(status['alert']);
        navigate("/login");
      }else{
        setAuth(true);
        console.log(status);
        setUserId({...status});
      }
    })
  },[]);

  // useEffect(()=>{
  //   try{
  //     fetch(`http://localhost:2218/auth`)
  //     .then(res => res.json())
  //     .then();
  //   }catch(error){
  //     alert('Client could not be authenticated');
  //   }finally{
  //     console.log('Welcome to Lumbini, lumhomies');
  //   }
   
  // },[]);

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
