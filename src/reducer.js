export function reducer(state = {}, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
      break;
    case "GET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
      break;
    case "GET_SETTINGS":
      return { ...state, settings: action.payload };
      break;
    case "CREATE_PRODUCT":
      console.log(action.payload);
      console.log("State", state.products);
      const { id, sku, name } = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          [id]: { sku: sku, name: name }
        }
      };
      break;
    default:
      return state;
  }
}
