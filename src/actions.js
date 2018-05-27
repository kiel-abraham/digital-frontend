export function createProduct(product) {
  return {
    type: "CREATE_PRODUCT",
    payload: product
  };
}

export function deleteProduct(sku) {
  return {
    type: "DELETE_PRODUCT",
    payload: sku
  };
}

export function updateProduct(product) {
  return {
    type: "UPDATE_PRODUCT",
    payload: product
  };
}
