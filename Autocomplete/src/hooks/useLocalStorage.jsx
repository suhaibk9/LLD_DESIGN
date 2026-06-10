export const useLocalStorage = () => {
  const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const getLocalStorage = (key) => {
    const d = localStorage.getItem(key);
    return JSON.parse(d);
  };
  return {setLocalStorage,getLocalStorage}
};
