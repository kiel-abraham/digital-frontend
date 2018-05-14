import React from "react";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Dashboard = () => (
  <div>
    <Jumbotron>
      <h1 className="display-3">Welcome!</h1>
      <p className="lead">
        This is a simple hero unit, a simple Jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-2" />
      <p>
        It uses utility classes for typgraphy and spacing to space content out
        within the larger container.
      </p>
      <br />
      <br />
      <Form>
        <FormGroup>
          <Label for="webhook">Add this webhook to your store settings</Label>
          <Input
            type="text"
            name="webhook"
            id="webhook"
            value="www.testsite.com.au/webhook"
            readOnly
          />
        </FormGroup>
      </Form>
      <p className="lead">
        <Button color="primary">Start</Button>
      </p>
    </Jumbotron>
  </div>
);

export default Dashboard;
