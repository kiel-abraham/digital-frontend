import React from "react";
import { connect } from "react-redux";
import { auth } from "../config";
import { setStoreName } from "../actions";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleStore = this.handleStore.bind(this);
    this.state = {
      email: "",
      password: "",
      store: ""
    };
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleStore(e) {
    this.setState({ store: e.target.value });
  }

  login(e) {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(message => {
        this.props.setStoreName(this.state.store);
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  }

  render() {
    return (
      <div>
        <h1 className="mb-5">Login</h1>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmail}
              id="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="store">Store</Label>
            <Input
              type="text"
              name="store"
              value={this.state.store}
              onChange={this.handleStore}
              id="store"
              placeholder="Store"
            />
          </FormGroup>
          <Button color="primary" onClick={this.login}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setStoreName
};

export default connect(null, mapDispatchToProps)(Login);
