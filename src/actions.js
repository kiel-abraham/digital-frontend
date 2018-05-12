export function createProduct(product) {
  return {
    type: "CREATE_PRODUCT",
    payload: product
  };
}
