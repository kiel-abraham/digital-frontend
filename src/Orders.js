import React from "react";
import { Table, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return(
  <div>
  <h1>Orders</h1>
  <Table striped responsive>
    <thead>
      <tr>
        <th>Order #</th>
        <th>Date</th>
        <th>Downloaded</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1003</th>
        <td>12/04/2018</td>
        <td>No</td>
        <td><Button color="primary" size="sm">Active</Button></td>
      </tr>
      <tr>
        <th scope="row">1002</th>
        <td>10/04/2018</td>
        <td>Yes</td>
        <td><Button color="primary" size="sm">Active</Button></td>
      </tr>
      <tr>
        <th scope="row">1001</th>
        <td>09/04/2018</td>
        <td>No</td>
        <td>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret color="info" size="sm">
                Expired
  </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Reactivate</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
        </td>
      </tr>
    </tbody>
  </Table>
  </div>
);
}
}

export default Orders;