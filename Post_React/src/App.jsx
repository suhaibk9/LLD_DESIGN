import { useEffect } from "react";
import { useState } from "react";

//https://jsonplaceholder.typicode.com/posts?_limit=50
const App = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=50",
      );
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) return <h1>Loading....</h1>;
  return (
    <>
      <h1>Posts</h1>
    </>
  );
};
export default App;
