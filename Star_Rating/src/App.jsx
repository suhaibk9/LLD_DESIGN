import { useState } from "react";
import StarRating from "./StarRating";
import "./App.css";
const App = () => {
  const [currRating, setCurrRating] = useState(3);
  const handleChange = (newRating) => {
    setCurrRating(newRating);
  };
  return (
    <div>
      <StarRating size={5} rating={currRating} onChange={handleChange} />
      <p>Current Rating:{currRating}</p>
    </div>
  );
};
export default App;
