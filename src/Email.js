import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from "reactstrap";

const Email = () => (
  <div>
    <h1 className="mb-5">Email</h1>
    <Form>
      <Row>
        <Col>
          <FormGroup>
            <Label for="reply">Reply To</Label>
            <Input
              type="email"
              name="reply"
              id="reply"
              placeholder="Enter your reply to email address"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="bcc">BCC</Label>
            <Input
              type="email"
              name="bcc"
              id="bcc"
              placeholder="Enter the email address you'd like to receive a copy at"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="logo">Logo</Label>
            <Input type="select" name="logo" id="logo">
              <option>Website</option>
              <option>PDF</option>
              <option>HTML</option>
              <option>Facebook</option>
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <img
            className="mb-3"
            src="https://www.riffsandlicks.com.au/assets/pdf_logo.gif"
          />
        </Col>
      </Row>
      <Button color="success" className="mb-3">
        Save
      </Button>
    </Form>
    <Row>
      <Col sm={{ size: 10, offset: 1 }}>
        <Card>
          <CardImg
            top
            width="100%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Email;
