import { useReducer } from "react";
import { createContext } from "react";
import { filterReducer, shoppingCartReducer } from "./reducer";
import { useFetch } from "../useFetch";
import { useEffect } from "react";
import { useContext } from "react";
const DATA_URL = "https://dummyjson.com/products?limit=100";
const ShoppingCart = createContext();
const Context = ({ children }) => {
  const { loading, data, error } = useFetch(DATA_URL);
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    products: [],
    cart: [],
  });
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
    sort: "",
  });

  useEffect(() => {
    if (data && data.products)
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.products,
      });
  }, [loading, data, error]);
  return (
    <ShoppingCart.Provider
      value={{ state, dispatch, filterDispatch, filterState }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};
export const ShoppingCartState = () => {
  return useContext(ShoppingCart);
};
export default Context;
