import { firestore } from "./config";
const db = firestore;

const user = "user1";
const productCollection = `users/${user}/products`;
const orderCollection = `users/${user}/orders`;

export function createProduct(product) {
  db
    .collection(productCollection)
    .doc(product.id)
    .set({
      id: product.id,
      sku: product.sku,
      name: product.name,
      fileName: product.fileName,
      fileId: 123456,
      timeCreated: product.timeCreated
    })
    .then(function() {
      console.log("Product added");
    })
    .catch(function(error) {
      console.error("Error creating product: ", error);
    });

  return {
    type: "CREATE_PRODUCT",
    payload: {
      id: product.id,
      sku: product.sku,
      name: product.name,
      fileName: product.fileName,
      fileId: 123456,
      timeCreated: product.timeCreated
    }
  };
}

export function updateProduct(product) {
  db
    .collection(productCollection)
    .doc(product.id)
    .update({
      sku: product.sku,
      name: product.name
    })
    .then(function() {
      console.log("Product updated");
    })
    .catch(function(error) {
      console.error("Error updating product: ", error);
    });

  return {
    type: "UPDATE_PRODUCT",
    payload: {
      id: product.id,
      sku: product.sku,
      name: product.name
    }
  };
}

export function deleteProduct(id) {
  db
    .collection(productCollection)
    .doc(id)
    .delete()
    .then(function() {
      console.log("Product deleted");
    })
    .catch(function(error) {
      console.error("Error deleting product: ", error);
    });

  return {
    type: "DELETE_PRODUCT",
    payload: id
  };
}

export function updateEmail(email) {
  db
    .collection("users")
    .doc(user)
    .update({
      email: {
        replyEmail: email.replyEmail,
        bccEmail: email.bccEmail,
        emailBody: email.emailBody
      }
    })
    .then(function() {
      console.log("Email settings updated");
    })
    .catch(function(error) {
      console.error("Error updating email: ", error);
    });

  return {
    type: "UPDATE_EMAIL",
    payload: {
      replyEmail: email.replyEmail,
      bccEmail: email.bccEmail,
      emailBody: email.emailBody
    }
  };
}

export function reactivateLink(orderId) {
  db
    .collection(orderCollection)
    .doc(orderId)
    .update({
      active: true
    })
    .then(function() {
      console.log("Order updated");
    })
    .catch(function(error) {
      console.error("Error updating order: ", error);
    });
  return {
    type: "UPDATE_LINK",
    payload: orderId
  };
}
