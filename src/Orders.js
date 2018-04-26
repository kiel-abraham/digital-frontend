import React from "react";
import {
  Table,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

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
    return (
      <div>
        <h1 className="mb-5">Orders</h1>
        <Row className="mb-4">
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="search" className="mr-sm-2">
                  Search
                </Label>
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for an order"
                />
              </FormGroup>
              <Button outline color="primary">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Order #</th>
              <th>SKU</th>
              <th>Date</th>
              <th>Downloaded</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1003</th>
              <td>2</td>
              <td>12/04/2018</td>
              <td>No</td>
              <td>
                <Button color="primary" size="sm">
                  Active
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">1002</th>
              <td>1</td>
              <td>10/04/2018</td>
              <td>Yes</td>
              <td>
                <Button color="primary" size="sm">
                  Active
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">1001</th>
              <td>3</td>
              <td>09/04/2018</td>
              <td>No</td>
              <td>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
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
