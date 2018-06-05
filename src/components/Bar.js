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
          <NavbarBrand>{this.props.companyName}</NavbarBrand>
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
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Digital Downloads
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/account">Account</Link>
                  </DropdownItem>
                  <DropdownItem>Report Issue</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/login">Login</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/logout">Logout</Link>
                  </DropdownItem>
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
