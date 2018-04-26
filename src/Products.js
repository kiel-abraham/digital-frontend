import React from "react";
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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
              <Button outline color="primary">
                Search
              </Button>
            </Form>
          </Col>
          <Col>
            <Button color="info" onClick={this.toggle}>
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
            <tr>
              <th scope="row">1</th>
              <td>eBook 1</td>
              <td>3</td>
              <td>
                <Button color="secondary" size="sm">
                  Edit
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>eBook 2</td>
              <td>12</td>
              <td>
                <Button color="secondary" size="sm">
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <Pagination>
          <PaginationItem disabled>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>

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
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Products;
