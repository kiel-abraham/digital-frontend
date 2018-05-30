import React from "react";
import { connect } from "react-redux";
import { updateEmail } from "../actions";
import Note from "./Note";
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
  FormText,
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
      note: false,
      noteColor: "",
      noteMessage: "",
      newBcc: "",
      newReply: "",
      newEmailBody: "",
      replyError: "",
      bccEmail: ""
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      newBcc: newProps.settings.bccEmail,
      newReply: newProps.settings.replyEmail,
      newEmailBody: newProps.settings.emailBody
    });
  }

  componentDidMount() {
    this.setState({
      newBcc: this.props.settings.bccEmail,
      newReply: this.props.settings.replyEmail,
      newEmailBody: this.props.settings.emailBody
    });
  }

  handleReply(e) {
    this.setState({ newReply: e.target.value, replyError: "" });
  }

  handleBcc(e) {
    this.setState({ newBcc: e.target.value });
  }

  handleEmailBody(e) {
    this.setState({ newEmailBody: e.target.value });
  }

  saveEmail(e) {
    //e.preventDefault();
    if (this.state.newReply === "") {
      this.setState({
        replyError: "Reply email is required",
        note: true,
        noteColor: "danger",
        noteMessage: "Please fix errors"
      });
    } else {
      this.props.updateEmail({
        replyEmail: this.state.newReply,
        bccEmail: this.state.newBcc,
        emailBody: this.state.newEmailBody
      });
      this.setState({
        note: true,
        noteColor: "success",
        noteMessage: "Save successful"
      });
    }
    setTimeout(
      function() {
        this.setState({
          note: false,
          noteColor: "",
          noteMessage: ""
        });
      }.bind(this),
      2000
    );
  }

  render() {
    return (
      <div>
        {this.state.note && (
          <Note color={this.state.noteColor} message={this.state.noteMessage} />
        )}
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
                        placeholder="Company Name - {{order.number}} digital download"
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
                        placeholder="{{customer.email}}"
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
                    <FormText color="danger">{this.state.replyError}</FormText>
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
                    <FormText color="danger">{this.state.bccError}</FormText>
                  </FormGroup>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <div>
                      <p>
                        Dear <Badge color="secondary">customer.firstName</Badge>,
                      </p>
                    </div>
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
                            <td>
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
                      <div>
                        <p>Regards,</p>
                      </div>
                    </div>
                  </CardText>
                  <Col xs="3" className="pl-0">
                    <img
                      className="mb-3"
                      alt="email logo"
                      src="https://kiels-guitars.staging-aws.neto.net.au/assets/pdf_logo.gif"
                    />
                  </Col>
                </CardBody>
              </Card>
              <Button
                color={this.state.save ? "info" : "success"}
                className="mt-3 float-right"
                onClick={this.saveEmail}
              >
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

const mapDispatchToProps = {
  updateEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
