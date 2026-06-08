import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartState } from "../context/context";

const Header = () => {
  const { filterDispatch, filterState, state } = ShoppingCartState();
  return (
    <nav className="h-16 px-10 border-b border-gray-200 flex justify-between items-center bg-white shadow-xs">
      <Link
        to={"/"}
        className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
      >
        ECommerce
      </Link>
      <input
        type="text"
        placeholder="Search for items..."
        value={filterState.searchQuery}
        onChange={(e) =>
          filterDispatch({ type: "FILTER_BY_SEARCH", payload: e.target.value })
        }
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-96 text-sm transition-shadow"
      />
      <Link
        to="/cart"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-98 transition-all text-sm"
      >
        Cart {state.cart.length}
      </Link>
    </nav>
  );
};

export default Header;
