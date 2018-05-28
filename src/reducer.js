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
      return {
        ...state,
        products: [...state.products, action.payload]
      };
      break;

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(
          item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  sku: action.payload.sku,
                  name: action.payload.name
                }
              : item
        )
      };
      break;

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload)
      };
      break;

    default:
      return { ...state };
  }
}
