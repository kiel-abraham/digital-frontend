import React from "react";
// import { bindActionCreators } from "redux";
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
      nameValue: ""
    };
  }

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

  handleSku(event) {
    this.setState({ skuValue: event.target.value });
  }

  handleName(event) {
    this.setState({ nameValue: event.target.value });
  }

  filterProducts(e) {
    console.log(e.target.value);
  }

  handleAdd() {
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

  render() {
    const data = this.props.products;
    return (
      <div>
        <h1 className="mb-5">Products</h1>
        <Row className="mb-4">
          <Col xs="3">
            <Button color="info" onClick={this.toggle}>
              Add Product
            </Button>
          </Col>
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="search" className="mr-sm-2">
                  Search
                </Label>
                <Input
                  type="text"
                  onChange={this.filterProducts}
                  name="search"
                  id="search"
                  placeholder="Search for a product"
                />
              </FormGroup>
            </Form>
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
            {Object.keys(data).map((item, index) => (
              <ProductItems key={index} {...data[item]} />
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
