import React from "react";
import { Col } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Email from "./Email";
import Settings from "./Settings";

const Main = () => (
  <Col sm="10">
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/products" component={Products} />
      <Route path="/orders" component={Orders} />
      <Route path="/email" component={Email} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </Col>
);

export default Main;
