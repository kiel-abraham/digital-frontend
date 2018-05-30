import React, { Component } from "react";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.reactivate = this.reactivate.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  reactivate() {
    this.props.parentToggle(this.props.orderId);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.orderId}</th>
        <td>{this.props.sku}</td>
        <td>{this.props.name}</td>
        <td>{this.props.downloaded ? "Yes" : "No"}</td>
        <td>
          {this.props.active ? (
            <Button color="primary" size="sm" disabled>
              Active
            </Button>
          ) : (
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle caret color="info" size="sm">
                Expired
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.reactivate}>
                  Reactivate
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          )}
        </td>
      </tr>
    );
  }
}

export default OrderItem;
