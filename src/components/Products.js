import React from "react";
import { storage } from "../config";
import { connect } from "react-redux";
import { createProduct, deleteProduct, updateProduct } from "../actions";
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
  Progress,
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
    this.toggleAdd = this.toggleAdd.bind(this);
    this.edit = this.edit.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSku = this.handleSku.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      modal: false,
      editing: false,
      note: true,
      noteMessage: "",
      noteColor: "",
      id: "",
      skuValue: "",
      skuError: "",
      nameValue: "",
      nameError: "",
      fileName: "",
      fileSize: 0,
      fileError: "",
      progress: 0,
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

  toggleAdd() {
    this.setState({
      editing: false,
      modal: !this.state.modal
    });
  }

  edit(product) {
    this.setState({
      editing: true,
      skuValue: product[0],
      nameValue: product[1],
      id: product[2],
      modal: !this.state.modal
    });
  }

  handleUpdate() {
    if (this.state.skuValue === "") {
      this.setState({ skuError: "Please enter a SKU" });
    }
    if (this.state.nameValue === "") {
      this.setState({ nameError: "Please enter a name" });
    }
    if (true) {
      let skuExists = this.checkSku(this.state.skuValue);
      if (typeof skuExists !== "undefined") {
        this.setState({ skuError: "SKU already exists" });
        return;
      }
    }
    if (this.state.skuValue !== "" && this.state.nameValue !== "") {
      this.props.updateProduct({
        id: this.state.id,
        sku: this.state.skuValue,
        name: this.state.nameValue
      });
      this.setState({
        skuValue: "",
        nameValue: "",
        skuError: "",
        nameError: "",
        fileError: "",
        modal: !this.state.modal
      });
      this.triggerNote("success", "Product updated");
    }
  }

  handleDeleteProduct() {
    this.props.deleteProduct(this.state.id);
    this.setState({
      skuValue: "",
      nameValue: "",
      skuError: "",
      nameError: "",
      fileError: "",
      modal: !this.state.modal
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
      progress: 0,
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
      const ref = storage.ref();
      const file = e.target.files[0];
      const name = ref.child("user1/" + e.target.files[0].name);
      const uploadTask = name.put(file);
      uploadTask.on("state_changed", snapshot => {
        let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        this.setState({
          progress: progress
        });
      });
      uploadTask.then(function(snapshot) {
        console.log("File uploaded");
      });
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
    if (this.state.editing) {
      let notCurrent = this.state.productList.filter(
        item => item.id !== this.state.id
      );
      return notCurrent.find(x => x.sku === sku);
    } else {
      return this.state.productList.find(x => x.sku === sku);
    }
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
        id: Date.now().toString(),
        timeCreated: new Date(),
        sku: this.state.skuValue,
        name: this.state.nameValue,
        fileName: this.state.fileName
      });
      this.triggerNote("success", "Product created");
      this.setState({
        skuValue: "",
        nameValue: "",
        progress: 0,
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
            <Button
              color="info"
              className="float-right"
              onClick={this.toggleAdd}
            >
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
          <ModalHeader toggle={this.toggle}>
            {this.state.editing ? "Edit Product" : "Add Product"}
          </ModalHeader>
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
              {!this.state.editing && (
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
                  <Progress animated color="info" value={this.state.progress} />
                </FormGroup>
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            {this.state.editing && (
              <Button
                outline
                color="danger"
                className="mr-auto"
                onClick={this.handleDeleteProduct}
              >
                Delete
              </Button>
            )}
            <Button outline color="secondary" onClick={this.cancel}>
              Cancel
            </Button>
            {this.state.editing ? (
              <Button color="success" onClick={this.handleUpdate}>
                Update
              </Button>
            ) : (
              <Button color="success" onClick={this.handleAdd}>
                Add
              </Button>
            )}
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
  deleteProduct,
  updateProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
