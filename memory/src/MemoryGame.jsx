import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [solved, setSolved] = useState([]);
  const [disable, setDisable] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const initialiseGame = () => {
    const totalCard = gridSize * gridSize;
    const pairCount = Math.floor(totalCard / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const suffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCard)
      .map((n, idx) => ({ id: idx, number: n }));

    setCards(suffledCards);
    setDisable(false);
    setSolved([]);
    setWon(false);
    setMoves(0);
    setMaxMoves(0);
    setFlipped([]);
    setGameOver(false);
  };
  useEffect(() => {
    initialiseGame();
  }, [gridSize]);
  const isFlliped = (id) => flipped.includes(id);
  const isSolved = (id) => solved.includes(id);
  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved((prev) => [...prev, firstId, secondId]);
      setFlipped([]);
      setDisable(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisable(false);
      }, 1000);
    }
  };
  const haveWon = () => {
    if (
      cards.length > 0 &&
      solved.length > 0 &&
      cards.length === solved.length
    ) {
      setWon(true);
      setGameOver(false);
      setDisable(true);
    }
  };
  useEffect(() => {
    haveWon();
  }, [solved, cards]);
  useEffect(() => {
    if (maxMoves > 0 && moves >= maxMoves && solved.length !== cards.length) {
      setGameOver(true);
      setDisable(true);
    }
  }, [moves, maxMoves, solved, cards]);
  const handleClick = (id) => {
    if (disable || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      setMoves((prev) => prev + 1);
    } else if (flipped.length === 1) {
      setDisable(true);
      if (id !== flipped[0]) {
        setFlipped((prev) => [...prev, id]);
        setMoves((prev) => prev + 1);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisable(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-gray-50 p-4 font-sans text-gray-800">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 tracking-tight">
        Memory Game!
      </h1>

      {/* Input */}
      <div className="space-y-3 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="gridSize"
            className="text-sm font-medium text-gray-600 w-32"
          >
            Grid Size (Max 10)
          </label>
          <input
            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-24"
            type="number"
            id="gridSize"
            min={"2"}
            max={"10"}
            value={gridSize}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                const size = parseInt(e.target.value);
                if (size >= 2 && size <= 10) setGridSize(size);
              } else {
                setGridSize(4);
              }
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="maxMoves"
            className="text-sm font-medium text-gray-600 w-32"
          >
            Max Moves
          </label>
          <input
            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-24"
            type="number"
            id="maxMoves"
            min={0}
            value={maxMoves}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                const size = parseInt(e.target.value);
                if (size >= 0) setMaxMoves(size);
              }
            }}
          />
        </div>
      </div>
      {/* Moves */}
      <div className="mb-4 text-sm font-semibold text-gray-600 bg-gray-100/80 px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
        Moves: <span className="text-indigo-600 font-bold">{moves}</span>
        {maxMoves > 0 && (
          <>
            {" "}
            / <span className="text-gray-500">{maxMoves}</span>
          </>
        )}
      </div>

      {/* Board */}
      <div
        className="grid gap-2 mb-6"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5}rem)`,
        }}
      >
        {cards.map((c) => {
          return (
            <div
              key={c.id}
              onClick={() => handleClick(c.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold cursor-pointer rounded-lg border transition-all duration-200 select-none shadow-sm ${
                isSolved(c.id)
                  ? "bg-emerald-500 border-emerald-600 text-white"
                  : isFlliped(c.id)
                    ? "bg-indigo-500 border-indigo-600 text-white"
                    : "bg-white border-gray-300 text-gray-400 hover:bg-gray-50 active:bg-gray-100"
              }`}
            >
              {isSolved(c.id) || isFlliped(c.id) ? c.number : "?"}
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <button
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors"
        onClick={() => {
          initialiseGame();
        }}
      >
        {won || gameOver ? "Play Again" : "Reset Game"}
      </button>

      {/* Result */}
      {gameOver && (
        <h1 className="mt-4 text-2xl font-bold text-red-600 animate-pulse">
          Game Over. Moves Finished. You Lost!
        </h1>
      )}
      {won && (
        <h1 className="mt-4 text-2xl font-bold text-emerald-600 animate-bounce">
          Yay!!! You won!!
        </h1>
      )}
    </div>
  );
};

export default MemoryGame;
