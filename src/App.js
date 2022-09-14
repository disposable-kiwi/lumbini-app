import React, { useEffect } from "react";
import CreatePostPage from "./components/routes/CreatePostPage";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from "./components/routes/LoginPage";
import AllPosts from "./components/routes/AllPosts";
import { useContext } from "react";
import './App.scss';
import { AuthContext } from "./components/context/auth.context";
import { UserContext } from "./components/context/user.context";

function App() {

  const { isAuth, setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    const checkAuthentication = () => {
      let headerDetails = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      fetch(`http://localhost:2218/checkToken`, headerDetails)
        .then(res => res.json())
        .then((objRes) => {
          if (objRes['error']) {
            alert(objRes['error']);
          } else {
            console.log(objRes);
            setAuth(true);
            console.log(objRes);
            setUser(objRes);
          }
        });
    };
    if (isAuth === false && token) {
      checkAuthentication();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/new-log" /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuth ? <Navigate to="/new-log" /> : <LoginPage />} />

      <Route path="/all-logs" element={isAuth ? <AllPosts /> : <Navigate to="/login" />} />
      <Route path="/new-log" element={isAuth ? <CreatePostPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
