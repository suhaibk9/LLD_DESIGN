import React from "react";
import Autocomplete from "./Components/Autocomplete";
import { useCache } from "./hooks/useCache";
const staticData = {};
const fetchSuggestions = async (query, signal) => {
  try {
    const res = await fetch("https://dummyjson.com/recipes/search?q=" + query, {
      signal,
    });
    const data = await res.json();
    staticData[query] = data.recipes;
    return data.recipes;
  } catch (err) {
    throw err;
  }
};

const App = () => {
  return (
    <div>
      <Autocomplete
        staticData={staticData}
        cache={true}
        placeholder={"Enter Reciepe"}
        fetchSuggestion={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading....</>}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        onSelect={() => {}}
        customStyles={{}}
      />
    </div>
  );
};

export default App;
