import { useState, useMemo, useEffect, useRef } from "react";
import { ShoppingCartState } from "../context/context";
import Pagination from "./Pagination";
import StarRating from "./StartRating";
import Filters from "./Filters";
import { useSearchParams } from "react-router-dom";

const filterMap = {
  sort: "SORT_BY_PRICE",
  byStock: "FILTER_BY_STOCK",
  byRating: "FILTER_BY_RATING",
  searchQuery: "FILTER_BY_SEARCH",
};

const Home = () => {
  const [page, setPage] = useState(1);
  const { state, dispatch, filterState, filterDispatch } = ShoppingCartState();
  const { byStock, byRating, sort, searchQuery } = filterState;
  const { products, cart } = state;

  let [searchParams, setSearchParams] = useSearchParams();

  const filterStateRef = useRef(filterState);
  useEffect(() => {
    filterStateRef.current = filterState;
  }, [filterState]);

  useEffect(() => {
    const { byStock, byRating, sort, searchQuery } = filterStateRef.current;
    const params = Object.fromEntries(searchParams.entries());
    const urlByStock = params.byStock === "true";
    const urlByRating = Number(params.byRating) || 0;
    const urlSort = params.sort || "";
    const urlSearchQuery = params.searchQuery || "";

    if (urlByStock !== byStock) {
      filterDispatch({ type: "FILTER_BY_STOCK", payload: urlByStock });
    }
    if (urlByRating !== byRating) {
      filterDispatch({ type: "FILTER_BY_RATING", payload: urlByRating });
    }
    if (urlSort !== sort) {
      filterDispatch({ type: "SORT_BY_PRICE", payload: urlSort });
    }
    if (urlSearchQuery !== searchQuery) {
      filterDispatch({ type: "FILTER_BY_SEARCH", payload: urlSearchQuery });
    }
  }, [searchParams, filterDispatch]);

  useEffect(() => {
    setSearchParams(filterState);
  }, [filterState, setSearchParams]);
  const handleChange = (idx, rate) => {
    dispatch({
      type: "UPDATE_RATING",
      payload: { index: idx, rating: rate },
    });
  };
  const filteredProducts = useMemo(() => {
    setPage(1);
    let filteredProducts = products;
    if (byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.stock > 0);
    }
    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => Math.floor(prod.rating) <= byRating,
      );
    }
    if (sort === "lowToHigh") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "highToLow") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (searchQuery.length > 0) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return filteredProducts;
  }, [byStock, byRating, sort, searchQuery, products]);
  const isProdInCart = (prodId) => {
    return cart.some((p) => p.id === prodId);
  };
  const handleAddToCart = (prod) => {
    if (!isProdInCart(prod.id))
      dispatch({ type: "ADD_TO_CART", payload: prod });
    else dispatch({ type: "REMOVE_FROM_CART", payload: { id: prod.id } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between py-10 gap-8">
        {/* Filter */}
        <Filters />
        {/* Products */}
        {products &&
          products.length > 0 &&
          (filteredProducts.length > 0 ? (
            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-gray-800 mb-6 ml-6">
                {filteredProducts.length} Products
              </h4>
              <div className="products w-full">
                {filteredProducts
                  .slice(page * 10 - 10, page * 10)
                  .map((prod, idx) => {
                    return (
                      <span className="products__single" key={prod.id}>
                        <img src={prod.thumbnail} alt={prod.title} />
                        <span className="product-details">
                          <span>{prod.title}</span>
                          <span>${prod.price}</span>
                          <StarRating
                            size={5}
                            rating={Math.floor(prod.rating)}
                            onChange={(rate) => handleChange(idx, rate)}
                          />
                        </span>
                        <button
                          className="btn"
                          onClick={() => handleAddToCart(prod)}
                        >
                          {isProdInCart(prod.id)
                            ? "Remove From Cart"
                            : "Add to Cart"}
                        </button>
                      </span>
                    );
                  })}
              </div>
              <Pagination
                products={filteredProducts}
                page={page}
                totalPages={Math.ceil(filteredProducts.length / 10)}
                setPage={setPage}
              />
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-gray-500 text-center w-3/4 py-20">
              Sorry, no products are available matching the selected filters.
            </h2>
          ))}
      </div>
    </div>
  );
};
export default Home;
