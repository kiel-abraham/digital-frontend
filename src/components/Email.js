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
    this.state = {
      newBcc: this.props.settings.bccEmail,
      newReply: this.props.settings.replyEmail
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
                        placeholder="Company name - Order # product downloads"
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
                        placeholder="customer email address"
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
                      Dear <Badge color="secondary">customer.firstName</Badge>{" "}
                      <Badge color="secondary">customer.Lastname</Badge>,
                    </p>
                    <br />
                    <div>
                      <FormGroup>
                        <Input
                          type="textarea"
                          name="emailBody"
                          id="emailBody"
                          value="Thank you for your order. Please click the link below to download your products."
                        />
                      </FormGroup>
                      <Table>
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
                  <img
                    className="mb-3"
                    src="https://www.riffsandlicks.com.au/assets/pdf_logo.gif"
                  />
                </CardBody>
              </Card>
              <Button color="success" className="mt-3 float-right">
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
  return {
    settings: { ...state.settings }
  };
}

export default connect(mapStateToProps)(Email);
