import { firestore } from "./config";

export function setStoreName(storeName) {
  return {
    type: "SET_STORE_NAME",
    payload: storeName
  };
}

export function getInfo(storeName) {
  const request = firestore
    .doc(`users/${storeName}`)
    .get()
    .catch(function(error) {
      console.log("Error getting user:", error);
    });

  return dispatch => {
    request.then(doc => {
      if (doc.exists) {
        dispatch({
          type: "GET_STORE",
          payload: doc.data()
        });
      } else {
        firestore.doc(`users/${storeName}`).set({
          companyName: storeName,
          email: {
            bccEmail: "",
            emailBody: "",
            replyEmail: "",
            id: storeName
          }
        });
        dispatch({
          type: "GET_STORE",
          payload: {
            companyName: storeName,
            email: {
              bccEmail: "",
              emailBody: "",
              replyEmail: "",
              id: storeName
            }
          }
        });
      }
    });
  };
}

export function getOrders(storeName) {
  const request = firestore.collection(`users/${storeName}/orders`).get();
  return dispatch => {
    request.then(querySnapshot => {
      const orders = [];
      querySnapshot.forEach(doc => {
        orders.push(doc.data());
      });
      dispatch({
        type: "GET_ORDERS",
        payload: orders
      });
    });
  };
}

export function getProducts(storeName) {
  const request = firestore.collection(`users/${storeName}/products`).get();
  return dispatch => {
    request.then(querySnapshot => {
      const products = [];
      querySnapshot.forEach(doc => {
        products.push(doc.data());
      });
      dispatch({
        type: "GET_PRODUCTS",
        payload: products
      });
    });
  };
}

export function createProduct(storeName, product) {
  const request = firestore
    .collection(`users/${storeName}/products`)
    .doc(product.id)
    .set({
      id: product.id,
      sku: product.sku,
      name: product.name,
      fileName: product.fileName,
      fileId: 123456,
      timeCreated: product.timeCreated
    })
    .catch(function(error) {
      console.error("Error creating product: ", error);
    });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: "CREATE_PRODUCT",
        payload: {
          id: product.id,
          sku: product.sku,
          name: product.name,
          fileName: product.fileName,
          fileId: 123456,
          timeCreated: product.timeCreated
        }
      });
    });
  };
}

export function updateProduct(storeName, product) {
  const request = firestore
    .collection(`users/${storeName}/products`)
    .doc(product.id)
    .update({
      sku: product.sku,
      name: product.name
    })
    .catch(function(error) {
      console.error("Error updating product: ", error);
    });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: {
          id: product.id,
          sku: product.sku,
          name: product.name
        }
      });
    });
  };
}

export function deleteProduct(storeName, id) {
  const request = firestore
    .collection(`users/${storeName}/products`)
    .doc(id)
    .delete()
    .then(() => {
      console.log("Product deleted");
    })
    .catch(error => {
      console.error("Error deleting product: ", error);
    });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: "DELETE_PRODUCT",
        payload: id
      });
    });
  };
}

export function updateEmail(storeName, email) {
  const request = firestore
    .collection("users")
    .doc(storeName)
    .update({
      email: {
        replyEmail: email.replyEmail,
        bccEmail: email.bccEmail,
        emailBody: email.emailBody
      }
    })
    .catch(function(error) {
      console.error("Error updating email: ", error);
    });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: "UPDATE_EMAIL",
        payload: {
          replyEmail: email.replyEmail,
          bccEmail: email.bccEmail,
          emailBody: email.emailBody
        }
      });
    });
  };
}

export function reactivateLink(storeName, orderId) {
  const request = firestore
    .collection(`users/${storeName}/orders`)
    .doc(orderId)
    .update({
      active: true
    })
    .catch(function(error) {
      console.error("Error updating order: ", error);
    });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: "UPDATE_LINK",
        payload: orderId
      });
    });
  };
}
