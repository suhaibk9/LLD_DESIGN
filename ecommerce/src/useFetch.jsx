import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isErr: false,
    err: null,
  });
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const ans = await res.json();

      setData(ans);
    } catch (err) {
      setError({ isErr: true, err });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return { loading, error, data };
};
export { useFetch };
