import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  Badge,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table
} from "reactstrap";

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.handleReply = this.handleReply.bind(this);
    this.handleBcc = this.handleBcc.bind(this);
    this.handleEmailBody = this.handleEmailBody.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.state = {
      save: false,
      newBcc: this.props.settings.bccEmail,
      newReply: this.props.settings.replyEmail,
      newEmailBody: this.props.settings.emailBody
    };
  }

  handleReply(e) {
    console.log(e.target.value);
    this.setState({ newReply: e.target.value });
  }

  handleBcc(e) {
    console.log(e.target.value);
    this.setState({ newBcc: e.target.value });
  }

  handleEmailBody(e) {
    console.log(e.target.value);
    this.setState({ newEmailBody: e.target.value });
  }

  saveEmail(e) {
    e.preventDefault();
    console.log(
      "Reply:",
      this.state.newReply,
      "BCC:",
      this.state.newBcc,
      "Body:",
      this.state.newEmailBody
    );
    this.setState({ save: true });
    setTimeout(
      function() {
        this.setState({ save: false });
      }.bind(this),
      2000
    );
  }

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
                        <InputGroupText>Subject</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="Company name - order.number product downloads"
                        disabled
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>To</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="toEmail"
                        placeholder="customer.email"
                        disabled
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Reply</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="reply"
                        value={this.state.newReply}
                        onChange={this.handleReply}
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
                        value={this.state.newBcc}
                        onChange={this.handleBcc}
                        placeholder="Enter an email to receive a copy"
                      />
                    </InputGroup>
                  </FormGroup>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <p>
                      Dear <Badge color="secondary">customer.firstName</Badge>,
                    </p>
                    <br />
                    <div>
                      <FormGroup>
                        <Input
                          type="textarea"
                          name="emailBody"
                          id="emailBody"
                          value={this.state.newEmailBody}
                          onChange={this.handleEmailBody}
                        />
                      </FormGroup>
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td scope="row">
                              <Badge color="secondary">product.sku</Badge>
                            </td>
                            <td>
                              <Badge color="secondary">product.name</Badge>
                            </td>
                            <td>
                              <Button size="sm" disabled>
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <br />
                      <br />
                      <p>Regards,</p>
                    </div>
                  </CardText>
                  <Col xs="3" className="pl-0">
                    <img
                      className="mb-3"
                      src="https://www.riffsandlicks.com.au/assets/pdf_logo.gif"
                    />
                  </Col>
                </CardBody>
              </Card>
              <Button
                color={this.state.save ? "info" : "success"}
                className="mt-3 float-right"
                onClick={this.saveEmail}
              >
                {this.state.save ? "Saved" : "Save"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: { ...state.settings }
  };
}

export default connect(mapStateToProps)(Email);
