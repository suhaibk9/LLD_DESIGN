import ProgressBar from "./Component/ProgressBar";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
const App = () => {
  const [val, setVal] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVal((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
  
  const handleComplete = () => {
    setComplete(true);
  };
  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar value={val} onComplete={handleComplete} />
      {complete && <h1>Completed</h1>}
    </div>
  );
};
export default App;
