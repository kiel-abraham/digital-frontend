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
      const { timeCreated, sku, name, fileName } = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          timeCreated: {
            sku: sku,
            name: name,
            fileName: fileName,
            timeCreated: timeCreated
          }
        }
      };
      break;

    case "DELETE_PRODUCT":
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
