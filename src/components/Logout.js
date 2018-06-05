import React from "react";
import { auth } from "../config";
import { Link } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    auth.signOut().catch(function(error) {
      console.log("Error logging out");
    });
  }

  render() {
    return (
      <div>
        <h1 className="mb-5">Logout</h1>
        <p>You have been logged out</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Logout;
