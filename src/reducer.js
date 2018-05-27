import db from "./config";

export function reducer(state = {}, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
      break;

    case "GET_USER":
      return {
        ...state,
        companyName: action.payload.companyName,
        settings: action.payload.email
      };
      break;

    case "GET_ORDERS":
      return { ...state, orders: action.payload };
      break;

    case "CREATE_PRODUCT":
      let { id, timeCreated, sku, name, fileName } = action.payload;
      let create = db
        .collection("users/user1/products")
        .doc(id)
        .set({
          id: id,
          sku: sku,
          name: name,
          fileName: fileName,
          fileId: 123456,
          timeCreated: timeCreated
        })
        .then(function() {
          console.log("Product added");
          return true;
        })
        .catch(function(error) {
          console.error("Error creating product: ", error);
          return false;
        });
      create.then(val => console.log(val));
      return {
        ...state,
        products: {
          ...state.products,
          id: {
            sku: sku,
            name: name,
            fileName: fileName,
            timeCreated: timeCreated
          }
        }
      };
      break;

    /*
    case "UPDATE_PRODUCT":
      const { a, b, c } = action.payload;

      var cityRef = db.collection("users/user1/products").doc("1527400927414");

      var setWithMerge = cityRef.set(
        {
          sku: b,
          name: c
        },
        { merge: true }
      );
      setWithMerge.then(console.log("done"));
      return state;
      break;
      */

    case "DELETE_PRODUCT":
      db
        .collection("users/user1/products")
        .doc(action.payload)
        .delete()
        .then(function() {
          console.log("Product deleted");
        })
        .catch(function(error) {
          console.error("Error deleting product: ", error);
        });
      let x = Object.keys(state.products).map((item, index) => {
        return state.products[item];
      });
      let filtered = x.filter(item => item.sku !== action.payload);
      return { ...state, products: filtered };
      break;

    default:
      return state;
  }
}
