import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navBarUpper">
      <h1 className="navlogo">Lumbini</h1>
      <ul className="navItems">
        <Link to={"/newAffirm"}><h3>New Affirmation</h3></Link>
        <Link to={"/allAffirms"}><h3>All Affirmations</h3></Link>
        <h3>Energize Me</h3>
      </ul>
    </header>
  );
}

export default Header;
