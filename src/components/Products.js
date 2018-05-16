import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions";
import ProductItems from "./ProductItems";
import {
  Table,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSku = this.handleSku.bind(this);
    this.handleName = this.handleName.bind(this);
    this.state = {
      modal: false,
      skuValue: "",
      nameValue: "",
      productList: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.productArray(newProps.products);
  }

  componentDidMount() {
    this.productArray(this.props.products);
  }

  productArray = value => {
    let x = Object.keys(value).map((item, index) => {
      return value[item];
    });
    x.sort(function(a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    this.setState({ productList: x });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  cancel() {
    this.setState({
      skuValue: "",
      nameValue: "",
      modal: !this.state.modal
    });
  }

  handleSku(e) {
    this.setState({ skuValue: e.target.value });
  }

  handleName(e) {
    this.setState({ nameValue: e.target.value });
  }

  filterProducts(e) {
    let updatedList = Object.keys(this.props.products).map((item, index) => {
      return this.props.products[item];
    });
    let filtered = updatedList.filter(item => {
      return (
        item.sku.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
        item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ productList: filtered });
  }

  checkSku(sku) {
    let x = this.state.productList.find(function(element) {
      return element.sku === sku;
    });
    return x;
  }

  handleAdd() {
    let skuExists = this.checkSku(this.state.skuValue);
    if (typeof skuExists === "undefined") {
      if (this.state.skuValue !== "" && this.state.nameValue !== "") {
        this.props.createProduct({
          id: Date.now(),
          sku: this.state.skuValue,
          name: this.state.nameValue
        });
        setTimeout(
          function() {
            this.setState({
              skuValue: "",
              nameValue: "",
              modal: !this.state.modal
            });
          }.bind(this),
          300
        );
      }
    }
  }

  render() {
    // console.log(this.state.productList);
    return (
      <div>
        <h1 className="mb-5">Products</h1>
        <Row className="mb-4">
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="search" className="mr-sm-2">
                  Search
                </Label>
                <Input
                  type="search"
                  onChange={this.filterProducts}
                  name="search"
                  id="search"
                  placeholder="Search for a product"
                />
              </FormGroup>
            </Form>
          </Col>
          <Col>
            <Button color="info" className="float-right" onClick={this.toggle}>
              Add Product
            </Button>
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productList.map((item, index) => (
              <ProductItems key={index} {...item} />
            ))}
          </tbody>
        </Table>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="sku">SKU</Label>
                <Input
                  type="text"
                  name="sku"
                  id="sku"
                  value={this.state.skuValue}
                  onChange={this.handleSku}
                  placeholder="Enter your SKU to match store"
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.nameValue}
                  onChange={this.handleName}
                  placeholder="Enter your product name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="file">File</Label>
                <Input type="file" name="file" id="file" />
                <FormText color="muted">
                  This is some placeholder block-level help text for the above
                  input. It's a bit lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button outline color="danger" onClick={this.cancel}>
              Cancel
            </Button>
            <Button color="success" onClick={this.handleAdd}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

/*
function mapStateToProps(state) {
   return {
     products: { ...state.products }
   };
 }
*/
const mapStateToProps = state => {
  return {
    products: { ...state.products }
  };
};

/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
*/
const mapDispatchToProps = {
  createProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
