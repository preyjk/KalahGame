import React, { useState } from "react";

const initialBoard = [
  4,
  4,
  4,
  4,
  4,
  4,
  0, // Player 1 side (last is their store)
  4,
  4,
  4,
  4,
  4,
  4,
  0, // Player 2 side (last is their store)
];

const LocalGame: React.FC = () => {
  const [board, setBoard] = useState<number[]>([...initialBoard]);
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [message, setMessage] = useState<string>("Player 1's turn");

  const handlePitClick = (index: number) => {
    if (
      (playerTurn === 1 && index >= 6) ||
      (playerTurn === 2 && (index < 7 || index === 13))
    ) {
      setMessage("Invalid move! Pick your own pits.");
      return;
    }

    const newBoard = [...board];
    let seeds = newBoard[index];
    if (seeds === 0) {
      setMessage("No seeds to pick!");
      return;
    }

    newBoard[index] = 0;
    let pos = index;
    while (seeds > 0) {
      pos = (pos + 1) % 14;
      if (playerTurn === 1 && pos === 13) continue; // Skip opponent's store
      if (playerTurn === 2 && pos === 6) continue;
      newBoard[pos]++;
      seeds--;
    }

    // Capture rule
    if (
      newBoard[pos] === 1 &&
      ((playerTurn === 1 && pos < 6) ||
        (playerTurn === 2 && pos > 6 && pos < 13))
    ) {
      const opposite = 12 - pos;
      newBoard[playerTurn === 1 ? 6 : 13] += newBoard[opposite] + 1;
      newBoard[pos] = 0;
      newBoard[opposite] = 0;
    }

    // Check for extra turn
    if ((playerTurn === 1 && pos === 6) || (playerTurn === 2 && pos === 13)) {
      setMessage(`Player ${playerTurn} gets another turn!`);
      setBoard(newBoard);
      return;
    }

    // Switch turn
    setBoard(newBoard);
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
    setMessage(`Player ${playerTurn === 1 ? 2 : 1}'s turn`);
  };

  return (
    <div className="game-container">
      <h1>Kalah</h1>
      <p>{message}</p>
      <div className="board">
        <div className="player-side">
          {board.slice(7, 13).map((seeds, idx) => (
            <button key={idx + 7} onClick={() => handlePitClick(idx + 7)}>
              {seeds}
            </button>
          ))}
        </div>
        <div className="stores">
          <div className="store">{board[13]}</div>
          <div className="store">{board[6]}</div>
        </div>
        <div className="player-side">
          {board.slice(0, 6).map((seeds, idx) => (
            <button key={idx} onClick={() => handlePitClick(idx)}>
              {seeds}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalGame;
