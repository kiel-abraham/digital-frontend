import React from "react";
import { connect } from "react-redux";
import { createProduct, deleteProduct } from "../actions";
import ProductItems from "./ProductItems";
import Note from "./Note";
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
    this.edit = this.edit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleEditSku = this.handleEditSku.bind(this);
    this.handleEditName = this.handleEditName.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSku = this.handleSku.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.state = {
      modal: false,
      editModal: false,
      note: true,
      noteMessage: "",
      noteColor: "",
      editSku: "",
      editName: "",
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

  triggerNote(color, message) {
    this.setState({
      note: true,
      noteColor: color,
      noteMessage: message
    });
    setTimeout(
      function() {
        this.setState({
          note: false,
          noteColor: "",
          noteMessage: ""
        });
      }.bind(this),
      2000
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  edit(product) {
    this.setState({
      editModal: !this.state.editModal,
      editSku: product[0],
      editName: product[1]
    });
  }

  closeEdit() {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  handleEditSku(e) {
    this.setState({ editSku: e.target.value });
  }

  handleEditName(e) {
    this.setState({ editName: e.target.value });
  }

  handleDeleteProduct() {
    this.props.deleteProduct(this.state.editSku);
    this.setState({
      editModal: !this.state.editModal
    });
    this.triggerNote("success", "Product deleted");
  }

  cancel() {
    this.setState({
      skuValue: "",
      nameValue: "",
      skuError: "",
      nameError: "",
      fileError: "",
      modal: !this.state.modal
    });
  }

  handleFile(e) {
    this.setState({
      fileName: e.target.files[0].name,
      fileSize: e.target.files[0].size
    });
    if (e.target.files[0].size > 1048576 * 10) {
      this.setState({ fileError: "Upload limit is 10MB" });
    } else {
      this.setState({ fileError: "" });
    }
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
    filtered.sort(function(a, b) {
      return b.timeCreated - a.timeCreated;
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
    if (typeof skuExists !== "undefined") {
      this.setState({ skuError: "SKU already exists" });
      return;
    }

    if (
      this.state.skuValue !== "" &&
      this.state.nameValue !== "" &&
      this.state.fileName !== "" &&
      this.state.skuError === "" &&
      this.state.nameError === "" &&
      this.state.fileError === ""
    ) {
      this.props.createProduct({
        timeCreated: Date.now(),
        sku: this.state.skuValue,
        name: this.state.nameValue,
        fileName: this.state.fileName
      });
      this.triggerNote("success", "Product created");
      this.setState({
        skuValue: "",
        nameValue: "",
        modal: !this.state.modal
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.note && (
          <Note color={this.state.noteColor} message={this.state.noteMessage} />
        )}
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
              <ProductItems key={index} parentToggle={this.edit} {...item} />
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
            <Button outline color="secondary" onClick={this.cancel}>
              Cancel
            </Button>
            <Button color="success" onClick={this.handleAdd}>
              Add
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editModal} toggle={this.closeEdit}>
          <ModalHeader toggle={this.closeEdit}>Edit Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="sku">SKU</Label>
                <Input
                  type="text"
                  name="sku"
                  id="sku"
                  value={this.state.editSku}
                  onChange={this.handleEditSku}
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.editName}
                  onChange={this.handleEditName}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              outline
              color="danger"
              className="mr-auto"
              onClick={this.handleDeleteProduct}
            >
              Delete
            </Button>
            <Button outline color="secondary" onClick={this.closeEdit}>
              Cancel
            </Button>
            <Button color="success" onClick={this.closeEdit}>
              Update
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
  createProduct,
  deleteProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
