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
      console.log("State", state.products);
      console.log("From reducer", action.payload);
      return state;
      break;
    default:
      return state;
  }
}
