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
  UncontrolledTooltip,
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
    this.handleFile = this.handleFile.bind(this);
    this.state = {
      modal: false,
      skuValue: "",
      skuError: "",
      nameValue: "",
      nameError: "",
      fileName: "",
      fileSize: 0,
      fileError: "",
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
      return b.timeCreated - a.timeCreated;
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

  handleFile(e) {
    console.log(e.target.files[0]);
    this.setState({
      fileName: e.target.files[0].name,
      fileSize: e.target.files[0].size,
      fileError: ""
    });
  }

  handleSku(e) {
    this.setState({ skuValue: e.target.value, skuError: "" });
  }

  handleName(e) {
    this.setState({ nameValue: e.target.value, nameError: "" });
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
    if (this.state.skuValue === "") {
      this.setState({ skuError: "Please enter a SKU" });
    }
    if (this.state.nameValue === "") {
      this.setState({ nameError: "Please enter a name" });
    }
    if (this.state.fileName === "") {
      this.setState({ fileError: "Please choose a file to upload" });
    }
    if (this.state.fileSize > 1048576 * 10) {
      this.setState({ fileError: "Upload limit is 10MB" });
    }
    let skuExists = this.checkSku(this.state.skuValue);
    if (typeof skuExists === "undefined") {
      if (
        this.state.skuValue !== "" &&
        this.state.nameValue !== "" &&
        this.state.fileName !== ""
      ) {
        this.props.createProduct({
          timeCreated: Date.now(),
          sku: this.state.skuValue,
          name: this.state.nameValue,
          fileName: this.state.fileName
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
    } else {
      this.setState({ skuError: "SKU already exists" });
    }
  }

  render() {
    return (
      <div>
        <h1 className="mb-5">Products</h1>
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
                  Search using SKU or Name
                </UncontrolledTooltip>
                <Input
                  type="search"
                  onChange={this.filterProducts}
                  name="search"
                  id="search"
                  placeholder="Search for a product"
                  autoComplete="off"
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
              <th>File</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productList.map((item, index) => (
              <ProductItems key={index} {...item} />
            ))}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                <FormText color="danger">{this.state.skuError}</FormText>
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
                <FormText color="danger">{this.state.nameError}</FormText>
              </FormGroup>
              <FormGroup>
                <Label for="file">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.handleFile}
                  accept="image/*, audio/*, video/*, text/plain, application/pdf"
                />
                <FormText color="muted">
                  Max size 10MB. Accepted formats include .pdf .avi .mkv
                </FormText>
                <FormText color="danger">{this.state.fileError}</FormText>
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
