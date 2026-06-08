import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
// const row1 = ar[0] === ar[1] && ar[1] === ar[2] && ar[0] === ar[2];
const generateWiningPattern = (n) => {
  const patterns = [];
  //Row Column
  for (let i = 0; i < n; i++) {
    const horizontalPattern = [];
    const verticalPattern = [];
    for (let j = 0; j < n; j++) {
      horizontalPattern.push(i * n + j);
      verticalPattern.push(j * n + i);
    }
    patterns.push(horizontalPattern);
    patterns.push(verticalPattern);
  }
  //Right Diagonal 0 5 10 15
  //i*n+i
  const leftDiagonal = [];
  for (let i = 0; i < n; i++) {
    leftDiagonal.push(i * n + i);
  }
  //Right Diagonal 0 3 6 9 12
  //i*n-i
  const rightDiagonal = [];
  for (let i = 0; i < n; i++) {
    // rightDiagonal.push(i * n - i);
    rightDiagonal.push(i * n + (n - 1 - i));
  }
  patterns.push(leftDiagonal);
  patterns.push(rightDiagonal);
  return patterns;
};
const WINNING_PATTERNS = (n) => generateWiningPattern(n);
const intialBoard = (n) => {
  return Array(n * n).fill(null);
};
export const useTicTacToe = (boardSize) => {
  const [board, setBoard] = useState(intialBoard(+boardSize));
  useEffect(() => {
    setBoard(intialBoard(+boardSize));
  }, [boardSize]);
  const [isXNext, setIsXNext] = useState(true);
  const calcWinner = (board) => {
    for (let pattern of WINNING_PATTERNS(boardSize)) {
      const firstChar = board[pattern[0]];
      if (!firstChar) continue;
      let isWin = true;
      for (let i = 1; i < pattern.length; i++) {
        if (board[pattern[i]] !== firstChar) {
          isWin = false;
          break;
        }
      }
      if (isWin) return firstChar;
    }
    return null;
  };
  const handleCellClick = (cellIdx) => {
    const winner = calcWinner(board);
    if (winner || board[cellIdx]) return;
    const newBoard = [...board];
    newBoard[cellIdx] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  const handleStatus = () => {
    const winner = calcWinner(board);
    if (winner) return winner + "Wins";
    const isDraw = !board.includes(null);
    if (isDraw) return `It's a Draw`;
    return `Player ${isXNext ? "X" : "O"} Turn`;
  };
  const handleReset = () => {
    setBoard(intialBoard(+boardSize));
    setIsXNext(true);
  };
  return {
    board,
    isXNext,
    setIsXNext,
    calcWinner,
    handleCellClick,
    handleReset,
    handleStatus,
  };
};
