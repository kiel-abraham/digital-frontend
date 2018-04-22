import React from "react";
import { Table, Button } from "reactstrap";

const Products = () => (
  <div>
    <h1>Products</h1>
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
          <td><Button color="secondary" size="sm">Edit</Button></td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>eBook 2</td>
          <td>12</td>
          <td><Button color="secondary" size="sm">Edit</Button></td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default Products;
