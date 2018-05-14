import React, { Component } from "react";
import { Button } from "reactstrap";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td scope="row">{this.props.sku}</td>
        <td>{this.props.name}</td>
        <td>
          <Button color="secondary" size="sm">
            Edit
          </Button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
