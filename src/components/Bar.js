import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">{this.props.companyName}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
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
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Digital Downloads
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Switch App</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Report Issue</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    companyName: state.companyName
  };
}

export default connect(mapStateToProps)(Bar);
