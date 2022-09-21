import React from "react";

import {

  Button,

} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <h1 className="navbar-brand">Test</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Button
          component={Link}
          to="/add/new"
          variant="contained"
   
          className="rounded-pill"
          style={{ background: "#003B6E", height: "44px" }}
        >
          Add 
        </Button>
        {/* <Link className="btn btn-outline-light" to="/add">
          Add Interest
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
