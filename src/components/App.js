import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Bar from "./Bar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Email from "./Email";
import Settings from "./Settings";

const App = () => (
  <div>
    <Bar />
    <Container fluid>
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/email" component={Email} />
            <Route path="/settings" component={Settings} />
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

export default App;
