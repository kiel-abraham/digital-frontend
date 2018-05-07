import React, { Component } from "react";
import { Button } from "reactstrap";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.sku}</th>
        <td>{this.props.name}</td>
        <td>3</td>
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