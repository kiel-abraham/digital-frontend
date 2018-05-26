import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Account = () => (
  <div>
    <h1 className="mb-5">Account</h1>
    <Form>
      <FormGroup>
        <Label for="webhook">Webhook</Label>
        <Input
          type="text"
          name="webhook"
          id="webhook"
          value="/webhook"
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="plan">Plan</Label>
        <Input type="select" name="plan" id="plan">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelectMulti">Installed Modules</Label>
        <Input
          type="select"
          name="selectMulti"
          id="exampleSelectMulti"
          multiple
        >
          <option>Downloads</option>
          <option>WYSIWYG</option>
          <option>Abandoned Carts</option>
        </Input>
      </FormGroup>
      <Button color="success">Save</Button>
    </Form>
  </div>
);
export default Account;
