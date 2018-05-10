import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";

function reducer(state = {}, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, productsB: action.payload };
      break;
    case "GET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
      break;
    case "GET_SETTINGS":
      return { ...state, settings: action.payload };
      break;
    default:
      return state;
  }
}

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

store.dispatch(dispatch => {
  axios
    .get(
      "https://raw.githubusercontent.com/kiel-abraham/digital-frontend/master/src/sample/config.json"
    )
    .then(response => {
      console.log("Axios", response.data);
      let tt = response.data.products;
      let ss = Object.keys(tt).map(x => {
        return tt[x];
      });
      dispatch({ type: "GET_PRODUCTS", payload: ss });
      dispatch({ type: "GET_SETTINGS", payload: response.data.settings });
      dispatch({
        type: "GET_COMPANY_NAME",
        payload: response.data.companyName
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
