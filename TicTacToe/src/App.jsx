import { useState } from "react";
import "./App.css";

import TicTacToe from "./TicTacToe";

const App = () => {
  const [size, setSize] = useState(3);
  return (
    <>
      <input value={size} onChange={(e) => setSize(e.target.value)} />
      <TicTacToe boardSize={size} />
    </>
  );
};

export default App;
