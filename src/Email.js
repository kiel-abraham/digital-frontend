import React from "react";
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

const Email = () => (
  <div>
    <h1 className="mb-5">Email</h1>
    <Form>
      <Row>
      <Col>
      <FormGroup>
      <InputGroup>
      <Label for="logo">Logo</Label>
      <Input type="select" name="logo" id="logo">
      <option>Website</option>
      <option>PDF</option>
      <option>HTML</option>
      <option>Facebook</option>
      </Input>
      </InputGroup>
      </FormGroup>
      <Button color="success">Save</Button>
      <Card>
      <CardHeader>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Reply</InputGroupText>
              </InputGroupAddon>
              <Input type="email" name="reply"
              placeholder="Enter your reply email"
              />
              </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>BCC</InputGroupText>
              </InputGroupAddon>
              <Input 
              type="email"
              name="bcc"
              placeholder="Enter an email to receive a copy"
              />
            </InputGroup>
          </FormGroup>
        </CardHeader>
        <CardBody>
          <img
            className="mb-3"
            src="https://www.riffsandlicks.com.au/assets/pdf_logo.gif"
          />
          <CardText>
          <p>Dear Customer,</p>
          <p>Thank you for your order. Please click the button below to download your product</p>
          <Button>Download</Button>
          </CardText>
          </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  </div>
);

export default Email;
