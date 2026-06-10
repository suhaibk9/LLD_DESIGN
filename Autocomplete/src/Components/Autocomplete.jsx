import { useRef, useEffect } from "react";
import { useState } from "react";
import SuggestionsList from "./SuggestionsList";
import "./styles.css";
import { useMemo } from "react";
import { useCallback } from "react";
import { useCache } from "../hooks/useCache";
const debounce = (fn, delay = 500) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const Autocomplete = ({
  placeholder = "",

  fetchSuggestion,
  dataKey = "",
  cache = true,
  customLoading = "Loading...",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onSelect = () => {},
  customStyles = {},
}) => {
  const { setCache, getCache } = useCache("autocomplete", 3600);
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log(suggestions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const suggestionsRef = useRef(null);
  const handleSuggestionClick = (e, text) => {
    e.preventDefault();
    setInputVal(text[dataKey]);
  };
  const handleInputChange = (evt) => {
    setInputVal(evt.target.value);
    onChange(evt.target.value);
  };
  const getSuggestionDebounced = async (query) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setError(null);
    setLoading(true);
    try {
      let result = await fetchSuggestion(query, controller.signal);
      setSuggestions(result);
      if (cache) setCache(query, result);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError("Failed to Get");
      setSuggestions([]);
    } finally {
      if (controller === controllerRef.current) {
        setLoading(false);
      }
    }
  };
  const getSuggestions = useMemo(
    () => debounce(getSuggestionDebounced, 500),
    [],
  );

  useEffect(() => {
    const cachedData = getCache(inputVal.trim());
    if (inputVal.trim().length === 0) {
      setSuggestions([]);
    } else if (cachedData?.data.length > 0) {
      setSuggestions(cachedData?.data);
    } else {
      getSuggestions(inputVal);
    }
  }, [inputVal]);
  const handleInputBlur = (evt) => {
    setSuggestions([]);
  };
  const handleInputFocus = () => {
    const query = inputVal.trim();
    if (!query) return;
    const cachedData = getCache(query);
    if (cachedData?.data.length > 0) {
      setSuggestions(cachedData.data);
    } else {
      getSuggestions(query);
    }
  };
  const handleKeyDown = (e) => {
    const key = e.key;
    if (suggestions.length === 0) return;

    const selectedIndex = suggestions.findIndex((s) => s.id === selectedId);

    if (key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % suggestions.length;
      setSelectedId(suggestions[nextIndex].id);
    } else if (key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (selectedIndex - 1 + suggestions.length) % suggestions.length;
      setSelectedId(suggestions[prevIndex].id);
    } else if (key === "Enter") {
      e.preventDefault();
      if (selectedIndex !== -1) {
        handleSuggestionClick(e, suggestions[selectedIndex]);
      }
    } else if (key === "Escape") {
      e.preventDefault();
      setSelectedId(null);
      setSuggestions([]);
    }
  };
  useEffect(() => {
    if (selectedId !== null) {
      const activeEl = document.getElementById(`suggestion-${selectedId}`);
      activeEl?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedId]);
  useEffect(() => {
    if (error) setSuggestions([]);
    else if (loading) setSuggestions([]);
  }, [loading, error]);
  return (
    <div className="container">
      <input
        type="text"
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedId}`}
        value={inputVal}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      {(suggestions.length > 0 || error || loading) && (
        <ul className="suggestions-list" id="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          {suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              highlight={inputVal}
              dataKey={dataKey}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
