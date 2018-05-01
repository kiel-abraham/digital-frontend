import React from "react";
import OrderItem from "./OrderItem";
import { Table, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

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

  handleFilter(event) {
    console.log(event.target.value);
  }

  render() {
    let orderList = [
      {
        orderId: "1001",
        sku: "1",
        date: "12/01/2018",
        firstName: "Test",
        lastName: "Person",
        email: "test@email.com",
        downloaded: true,
        active: false
      },
      {
        orderId: "1002",
        sku: "2",
        date: "13/01/2018",
        firstName: "Mary",
        lastName: "Smith",
        email: "mary@email.com",
        downloaded: false,
        active: true
      },
      {
        orderId: "1003",
        sku: "3",
        date: "14/01/2018",
        firstName: "John",
        lastName: "Smith",
        email: "john@email.com",
        downloaded: false,
        active: true
      }
    ];
    return (
      <div>
        <h1 className="mb-5">Orders</h1>
        <Row className="mb-4">
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="filer" className="mr-sm-2">
                  Filter
                </Label>
                <Input
                  type="text"
                  name="filter"
                  id="filter"
                  onKeyUp={this.handleFilter.bind(this)}
                  placeholder="Filter using an order ID"
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Order #</th>
              <th>SKU</th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Downloaded</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(c => (
              <OrderItem
                key={c.orderId}
                orderId={c.orderId}
                date={c.date}
                firstName={c.firstName}
                lastName={c.lastName}
                email={c.email}
                sku={c.sku}
                downloaded={c.downloaded}
                active={c.active}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Orders;
