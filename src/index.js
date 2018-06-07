import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
