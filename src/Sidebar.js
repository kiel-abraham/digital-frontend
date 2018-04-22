import React from "react";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <Col sm="2">
    <aside>
      <nav>
        <Nav vertical>
          <NavItem>
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </NavItem>
          <NavItem>
          <Link to="/orders" className="nav-link">
          Orders
          </Link>
          </NavItem>
          <NavItem>
          <Link to="/email" className="nav-link">
          Email
          </Link>
          </NavItem>
          <NavItem>
          <Link to="/settings" className="nav-link">
          Settings
          </Link>
          </NavItem>
          <hr />
          <NavItem>
          <NavLink>Logout</NavLink>
          </NavItem>
        </Nav>
      </nav>
    </aside>
  </Col>
);

export default Sidebar;
