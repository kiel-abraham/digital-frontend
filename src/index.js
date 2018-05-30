import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import { firestore } from "./config";

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

const db = firestore;
const user = "user1";

store.dispatch(dispatch => {
  db
    .doc(`users/${user}`)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        dispatch({ type: "GET_USER", payload: doc.data() });
      } else {
        console.log("No such user!");
      }
    })
    .catch(function(error) {
      console.log("Error getting user:", error);
    });

  db
    .collection(`users/${user}/orders`)
    .get()
    .then(querySnapshot => {
      const orders = [];
      querySnapshot.forEach(doc => {
        orders.push(doc.data());
      });
      dispatch({ type: "GET_ORDERS", payload: orders });
    });

  db
    .collection(`users/${user}/products`)
    .get()
    .then(querySnapshot => {
      const products = [];
      querySnapshot.forEach(doc => {
        products.push(doc.data());
      });
      dispatch({ type: "GET_PRODUCTS", payload: products });
    });

  /*
  db
    .collection(`users/${user}/products`)
    .doc("1527400927414")
    .set(
      {
        sku: "test2",
        name: "Update"
      },
      { merge: true }
    );
  */
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
