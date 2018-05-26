import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import db from "./config";

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, middleware);

store.dispatch(dispatch => {
  db
    .doc(`users/user1`)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        dispatch({ type: "GET_COMPANY_NAME", payload: doc.data().companyName });
        dispatch({ type: "GET_SETTINGS", payload: doc.data().email });
      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  db
    .collection(`users/user1/orders`)
    .get()
    .then(querySnapshot => {
      const orders = [];
      querySnapshot.forEach(doc => {
        orders.push(doc.data());
      });
      dispatch({ type: "GET_ORDERS", payload: orders });
    });

  axios
    .get(
      "https://raw.githubusercontent.com/kiel-abraham/digital-frontend/master/src/sample/config.json"
    )
    .then(response => {
      dispatch({ type: "GET_PRODUCTS", payload: response.data.products });
      // dispatch({ type: "GET_SETTINGS", payload: response.data.settings });
      // dispatch({type: "GET_COMPANY_NAME",payload: response.data.companyName});
    })
    .catch(function(error) {
      console.log("Error getting config data: ", error);
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
