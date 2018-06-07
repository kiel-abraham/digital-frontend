import React, { Component } from "react";
import { Button } from "reactstrap";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.passProduct = this.passProduct.bind(this);
  }

  passProduct() {
    this.props.parentToggle([this.props.sku, this.props.name, this.props.id]);
  }

  render() {
    return (
      <tr>
        <td>{this.props.sku}</td>
        <td>{this.props.name}</td>
        <td>{this.props.fileName}</td>
        <td>
          <Button color="secondary" size="sm" onClick={this.passProduct}>
            Edit
          </Button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
