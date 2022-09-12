import React, { useContext, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { UserContext } from "../context/user.context";

function Header() {

  const {setAuth} = useContext(AuthContext);
  const {setUser} = useContext(UserContext);

  /*fix this route navigator*/
  function handleSignOut(){
    localStorage.removeItem("jwt");
    setUser({});
    setAuth(false);
  }

  return (
    <Fragment>
    <header className="navBarUpper">
      <Link to={"/new-log"} style={{ textDecoration: 'none' }}><h1 className="navlogo">Lumbini</h1></Link>
      <div className="navItems">
        <Link to={"/new-log"}><h3 className="nav-items">Write New Logs</h3></Link>
        <Link to={"/all-logs"}><h3 className="nav-items">All Logs</h3></Link>
        <Link to={"/login"}><h4 onClick={handleSignOut} className="nav-items sign-out">Sign Out</h4></Link>
      </div>
    </header>
    <Outlet />
    </Fragment>
  );
}

export default Header;
