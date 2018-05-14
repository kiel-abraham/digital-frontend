import React from "react";
import OrderItems from "./OrderItems";
import { Table, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.filterOrders = this.filterOrders.bind(this);
    this.state = {
      dropdownOpen: false,
      orders: [],
      orderList: []
    };
  }

  componentDidMount() {
    const x = [
      {
        orderId: "1001",
        sku: "1",
        name: "Product1",
        downloaded: true,
        active: false
      },
      {
        orderId: "1002",
        sku: "2",
        name: "Product2",
        downloaded: false,
        active: true
      },
      {
        orderId: "1003",
        sku: "3",
        name: "Product3",
        downloaded: false,
        active: true
      }
    ];
    this.setState({
      orders: x,
      orderList: x
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  filterOrders(e) {
    let y = this.state.orderList.filter(item => {
      return (
        item.sku.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
        item.orderId.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ orders: y });
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
                  type="search"
                  onChange={this.filterOrders}
                  name="search"
                  id="search"
                  placeholder="Search for an order"
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
              <th>Name</th>
              <th>Downloaded</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((item, index) => (
              <OrderItems key={index} {...item} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Orders;
