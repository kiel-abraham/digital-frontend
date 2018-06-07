export function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_STORE_NAME":
      return {
        ...state,
        storeName: action.payload
      };
      break;

    case "GET_STORE":
      return {
        ...state,
        companyName: action.payload.companyName,
        settings: action.payload.email
      };
      break;

    case "UPDATE_EMAIL":
      return { ...state, settings: action.payload };
      break;

    case "GET_ORDERS":
      return { ...state, orders: action.payload };
      break;

    case "UPDATE_LINK":
      return {
        ...state,
        orders: state.orders.map(
          item =>
            item.orderId === action.payload
              ? {
                  ...item,
                  active: true
                }
              : item
        )
      };
      break;

    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
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
