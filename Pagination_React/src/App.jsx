import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Components/pagination";

//
const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch(
      "https://dummyjson.com/products?limit=10&skip=" + (page * 10 - 10),
    );
    const data = await res.json();
    if (data && data.products) {
      setTotalPages(Math.ceil(data.total / 10));
      console.log("total", data.total);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <Pagination
      products={products}
      page={page}
      totalPages={totalPages}
      setPage={setPage}
    />
  );
};
export default App;
