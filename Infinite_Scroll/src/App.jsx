import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://dummyjson.com/products?limit=" + page * 10,
      );
      const data = await res.json();
      console.log("data", data);

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const throttle = (fn, d) => {
    let lastRan = null;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastRan >= d) {
        lastRan = now;
        return fn(...args);
      }
    };
  };
  const handleScroll = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 500);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { products: allProducts } = products;
  return (
    <div>
      <h1>Infinite</h1>
      <div className="products">
        {allProducts &&
          allProducts.map((prod) => {
            return (
              <div key={prod.id} className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            );
          })}
      </div>
      {loading && <div>Loading.....</div>}
      
    </div>
  );
};
export default App;
