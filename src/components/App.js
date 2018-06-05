import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth } from "../config";
import Bar from "./Bar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Email from "./Email";
import Account from "./Account";
import Login from "./Login";
import Logout from "./Logout";

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div>
        {this.state.loggedIn && <Bar />}
        <Container fluid>
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  authed={this.state.loggedIn}
                  component={Dashboard}
                />
                <PrivateRoute
                  path="/products"
                  authed={this.state.loggedIn}
                  component={Products}
                />
                <PrivateRoute
                  path="/orders"
                  authed={this.state.loggedIn}
                  component={Orders}
                />
                <PrivateRoute
                  path="/email"
                  authed={this.state.loggedIn}
                  component={Email}
                />
                <PrivateRoute
                  path="/account"
                  authed={this.state.loggedIn}
                  component={Account}
                />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
              </Switch>
              <footer className="mt-5">
                <hr />
                <p className="text-center text-muted">&copy; 2018</p>
              </footer>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
