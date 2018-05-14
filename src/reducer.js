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
    case "GET_ORDERS":
      return { ...state, orders: action.payload };
      break;
    case "CREATE_PRODUCT":
      const { id, sku, name } = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          ["id" + id]: { sku: sku, name: name }
        }
      };
      break;
    default:
      return state;
  }
}
