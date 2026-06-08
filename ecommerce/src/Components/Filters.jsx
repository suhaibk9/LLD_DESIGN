import { ShoppingCartState } from "../context/context";
import StarRating from "./StartRating";

const Filters = () => {
  const { filterDispatch, filterState } = ShoppingCartState();
  const { byStock, byRating, sort } = filterState;
  return (
    <div className="flex flex-col w-[24%] gap-4 p-6 border border-gray-200 rounded-xl bg-gray-50 h-fit shadow-xs">
      <span className="font-bold text-xl text-gray-800">Filter Products</span>
      <hr className="border-gray-200" />

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">By Price</span>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="radio"
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            id="asc"
            name="sort"
            checked={sort === "lowToHigh"}
            onChange={() => {
              filterDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" });
            }}
          />
          Ascending
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="radio"
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            id="desc"
            name="sort"
            checked={sort === "highToLow"}
            onChange={() => {
              filterDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" });
            }}
          />
          Descending
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">By Stock</span>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded-xs focus:ring-blue-500"
            id="outofstock"
            checked={byStock}
            onChange={() => {
              filterDispatch({ type: "FILTER_BY_STOCK" });
            }}
          />
          Exclude out of Stock
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">By Rating</span>
        <div className="flex items-center">
          <StarRating
            size={5}
            rating={byRating}
            onChange={(rate) => {
              filterDispatch({ type: "FILTER_BY_RATING", payload: rate });
            }}
          />
        </div>
      </div>

      <button
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer text-sm active:scale-98"
        onClick={() => {
          filterDispatch({ type: "CLEAR_FILTERS" });
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};
export default Filters;
