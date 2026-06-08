import { useTicTacToe } from "./useTicTacToe";

const TicTacToe = ({ boardSize = 3 }) => {
  const {
    board,
    isXNext,

    calcWinner,
    handleCellClick,
    handleReset,
    handleStatus,
  } = useTicTacToe(boardSize);
  console.log(board);
  return (
    <div className="game" style={{ "--board-size": boardSize }}>
      <div className="status">
        {handleStatus()}
        <button onClick={handleReset}>Reset Game</button>
      </div>
      <div className="board">
        {board.map((cell, idx) => {
          return (
            <button
              onClick={() => handleCellClick(idx)}
              className="cell"
              key={idx}
              disabled={cell !== null}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
