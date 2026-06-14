const useLocalStorage = () => {
  const setLocalStorage = (key: string, data: number[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const getLocalStorage = (key: string): number[] | null | undefined => {
    const keyData = JSON.parse(localStorage.getItem(key));
    return keyData;
  };
  return { setLocalStorage, getLocalStorage };
};
export { useLocalStorage };
