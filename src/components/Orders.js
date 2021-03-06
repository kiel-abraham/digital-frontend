import React from "react";
import { connect } from "react-redux";
import { reactivateLink } from "../actions";
import OrderItems from "./OrderItems";
import {
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip
} from "reactstrap";

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.filterOrders = this.filterOrders.bind(this);
    this.reactivateClicked = this.reactivateClicked.bind(this);
    this.state = {
      dropdownOpen: false,
      orders: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.orderArray(newProps.orders);
  }

  componentDidMount() {
    this.orderArray(this.props.orders);
  }

  reactivateClicked(id) {
    this.props.reactivateLink(this.props.storeName, id);
  }

  orderArray = value => {
    let x = Object.keys(value).map((item, index) => {
      return value[item];
    });
    x.sort(function(a, b) {
      return b.orderId - a.orderId;
    });
    this.setState({ orders: x });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  filterOrders(e) {
    let updatedList = Object.keys(this.props.orders).map((item, index) => {
      return this.props.orders[item];
    });
    let filtered = updatedList.filter(item => {
      return (
        item.sku.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
        item.orderId.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    this.orderArray(filtered);
  }

  render() {
    return (
      <div>
        <h1 className="mb-5">Orders</h1>
        <Row className="mb-4">
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <a href="#" id="help">
                  <Label for="search" className="mr-sm-2">
                    Search
                  </Label>
                </a>
                <UncontrolledTooltip placement="top" target="help">
                  Search using Order #, SKU or Name
                </UncontrolledTooltip>
                <Input
                  type="search"
                  onChange={this.filterOrders}
                  name="search"
                  id="search"
                  placeholder="Search for an order"
                  autoComplete="off"
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
            {Object.keys(this.state.orders).map((item, index) => (
              <OrderItems
                key={index}
                parentToggle={this.reactivateClicked}
                {...this.state.orders[item]}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeName: state.storeName,
    orders: { ...state.orders }
  };
};

const mapDispatchToProps = {
  reactivateLink
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
