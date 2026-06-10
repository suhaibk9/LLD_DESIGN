import { useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

const getCurrentTimeStamp = () => {
  return Math.floor(Date.now() / 1000);
};
const useCache = (key, expiry) => {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  const cache = useRef(getLocalStorage(key) || {});

  const getCache = (query) => {
    const cachedData = getLocalStorage(key) || {};
    if (cachedData[query]) {
      const cacheExpired =
        getCurrentTimeStamp() - cachedData[query].timeStamp >= expiry;
      if (!cacheExpired) {
        return cachedData[query];
      } else {
        delete cachedData[query];
        setLocalStorage(key, cachedData);
        return null;
      }
    }
  };
  const setCache = (query, data) => {
    const timeStamp = getCurrentTimeStamp();
    cache.current[query] = {
      data,
      timeStamp,
    };
    setLocalStorage(key, cache.current);
  };
  return { getCache, setCache };
};
export { useCache };
