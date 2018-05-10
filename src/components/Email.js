import React from "react";
import { connect } from "react-redux";
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

class Email extends React.Component {
  render() {
    return (
      <div>
        <h1 className="mb-5">Email</h1>
        <Form>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Reply</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="reply"
                        value={this.props.settings.replyEmail}
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
                        value={this.props.settings.bccEmail}
                        placeholder="Enter an email to receive a copy"
                      />
                    </InputGroup>
                  </FormGroup>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <p>Dear Customer,</p>
                    <br />
                    <p>
                      Thank you for your order [order number].<br />
                      Please click the button below to download your product
                    </p>
                    <p>[sku] [name]</p>
                    <Button disabled>Download</Button>
                    <br />
                    <br />
                    <br />
                  </CardText>
                  <img
                    className="mb-3"
                    src="https://www.riffsandlicks.com.au/assets/pdf_logo.gif"
                  />
                </CardBody>
              </Card>
              <Button color="success" className="mt-3">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    settings: { ...state.settings }
  };
}

export default connect(mapStateToProps)(Email);
