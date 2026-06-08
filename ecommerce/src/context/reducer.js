export const shoppingCartReducer = (state, action) => {
  const key = action.type;
  if (key === "FETCH_PRODUCTS") {
    return { ...state, products: action.payload };
  } else if (key === "UPDATE_RATING") {
    const allProducts = state.products;
    allProducts[action.payload.index] = {
      ...allProducts[action.payload.index],
      rating: action.payload.rating,
    };
    return { ...state, products: allProducts };
  } else if (key === "ADD_TO_CART") {
    return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
  } else if (key === "REMOVE_FROM_CART") {
    return {
      ...state,
      cart: state.cart.filter((c) => c.id !== action.payload.id),
    };
  } else if (key === "CHANGE_CART_QTY") {
    return {
      ...state,
      cart: state.cart.map((c) =>
        c.id === action.payload.id ? { ...c, qty: action.payload.newQty } : c,
      ),
    };
  } else return state;
};
export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return {
        ...state,
        byStock: action.payload !== undefined ? action.payload : !state.byStock,
      };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byRating: 0,
        searchQuery: "",
        sort: "",
      };
    default:
      return state;
  }
};
