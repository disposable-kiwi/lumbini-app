import React from "react";
import './header.styles.scss';


function Header() {
  return (
    <header>
      <h1>Lumbini</h1>
      <ul className="navbar-nav">
        <h2>Contact</h2>
        <h2>Posts</h2>
        <h2>About</h2>
      </ul>
    </header>
  );
}

export default Header;
