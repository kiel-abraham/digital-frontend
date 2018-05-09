import React from "react";
import axios from "axios";
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
    this.state = {
      modal: false,
      products: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/kiel-abraham/digital-frontend/master/src/sample/config.json"
      )
      .then(response => {
        console.log(response.data.products);
        this.setState({ products: response.data.products });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
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
                  type="text"
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
              <th>Downloads</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.products).map((item, index) => (
              <ProductItems key={index} {...this.state.products[item]} />
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
                  placeholder="Enter your SKU to match store"
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
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
            <Button outline color="danger" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="success" onClick={this.toggle}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Products;
