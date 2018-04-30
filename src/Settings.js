import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Settings = () => (
  <div>
    <h1 className="mb-5">Settings</h1>
    <Form>
      <FormGroup>
        <Label for="url">URL</Label>
        <Input
          type="text"
          name="url"
          id="url"
          placeholder="Enter your store URL"
        />
      </FormGroup>
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
        <Label for="api">API</Label>
        <Input type="text" name="api" id="api" placeholder="API key" />
      </FormGroup>
      <FormGroup>
        <Label for="file">File</Label>
        <Input type="file" name="file" id="file" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <Button color="success">Save</Button>
    </Form>
  </div>
);
export default Settings;
