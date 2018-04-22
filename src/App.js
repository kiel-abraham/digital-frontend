import React from "react";
import { Container, Row } from "reactstrap";
import Bar from "./Bar";
import Sidebar from "./Sidebar";
import Main from "./Main";

const App = () => (
  <div>
    <Bar />
    <Container fluid>
      <Row>
        <Sidebar />
        <Main />
      </Row>
    </Container>
  </div>
);

export default App;
