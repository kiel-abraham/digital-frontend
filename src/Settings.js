import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Settings = () => (
  <div>
    <h1 className="mb-5">Settings</h1>
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
        <Label for="logo">Logo</Label>
        <Input type="select" name="logo" id="logo">
          <option>Website</option>
          <option>PDF</option>
          <option>HTML</option>
          <option>Facebook</option>
          <option>Mobile</option>
        </Input>
      </FormGroup>
      <Button color="success">Save</Button>
    </Form>
  </div>
);
export default Settings;
