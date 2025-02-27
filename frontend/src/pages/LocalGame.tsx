import React, { useState } from "react";

const initialBoard = [
  4,
  4,
  4,
  4,
  4,
  4,
  0, // Player 1 store
  4,
  4,
  4,
  4,
  4,
  4,
  0, // Player 2 store
];

const isGameOver = (board: number[]) => {
  return (
    board.slice(0, 6).every((seeds) => seeds === 0) ||
    board.slice(7, 13).every((seeds) => seeds === 0)
  );
};

const getNextPit = (pos: number, playerTurn: number): number => {
  do {
    pos = (pos + 1) % 14;
  } while ((playerTurn === 1 && pos === 13) || (playerTurn === 2 && pos === 6));

  return pos;
};

const LocalGame: React.FC = () => {
  const [board, setBoard] = useState<number[]>([...initialBoard]);
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [message, setMessage] = useState<string>("Player 1's turn");

  const handlePitClick = (index: number) => {
    if (isGameOver(board)) return;

    if (
      (playerTurn === 1 && (index < 0 || index > 5)) ||
      (playerTurn === 2 && (index < 7 || index > 12))
    ) {
      setMessage("Invalid move! Pick your own pits.");
      return;
    }

    if (board[index] === 0) {
      setMessage("No seeds to pick!");
      return;
    }

    let newBoard = [...board];
    let seeds = newBoard[index];
    newBoard[index] = 0;
    let pos = index;

    while (seeds > 0) {
      pos = getNextPit(pos, playerTurn);
      newBoard[pos]++;
      seeds--;
    }

    // Capture rule
    if (
      newBoard[pos] === 1 &&
      ((playerTurn === 1 && pos >= 0 && pos < 6) ||
        (playerTurn === 2 && pos >= 7 && pos < 13))
    ) {
      const opposite = 12 - pos;
      if (newBoard[opposite] > 0) {
        newBoard[playerTurn === 1 ? 6 : 13] += newBoard[opposite] + 1;
        newBoard[pos] = 0;
        newBoard[opposite] = 0;
      }
    }

    // Check for game over
    if (isGameOver(newBoard)) {
      const player1Store = newBoard[6];
      const player2Store = newBoard[13];

      const remainingPlayer1 = newBoard.slice(0, 6).reduce((a, b) => a + b, 0);
      const remainingPlayer2 = newBoard.slice(7, 13).reduce((a, b) => a + b, 0);

      newBoard = [...newBoard];
      newBoard[6] = player1Store + remainingPlayer1;
      newBoard[13] = player2Store + remainingPlayer2;

      newBoard.fill(0, 0, 6);
      newBoard.fill(0, 7, 13);

      setBoard(newBoard);
      setMessage(
        newBoard[6] > newBoard[13]
          ? "Player 1 wins!"
          : newBoard[6] < newBoard[13]
          ? "Player 2 wins!"
          : "It's a tie!"
      );
      return;
    }

    // Check if last seed landed in player's store (grant extra turn)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
        Kalah
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-8">{message}</p>
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex flex-col gap-4 sm:gap-8">
          <div className="flex justify-center gap-2 sm:gap-4">
            {board
              .slice(7, 13)
              .reverse()
              .map((seeds, idx) => (
                <button
                  key={12 - idx}
                  onClick={() => handlePitClick(12 - idx)}
                  className={`w-12 h-12 sm:w-24 md:w-32 sm:h-24 md:h-32 rounded-full bg-blue-100 hover:bg-blue-200 
                    flex items-center justify-center text-sm sm:text-xl font-bold
                    ${playerTurn === 2 ? "hover:ring-2 ring-blue-500" : ""}`}
                >
                  {seeds}
                </button>
              ))}
          </div>
          <div className="flex justify-between">
            <div className="w-16 sm:w-32 h-20 sm:h-40 bg-green-100 rounded-lg flex items-center justify-center text-lg sm:text-2xl font-bold">
              {board[13]}
            </div>
            <div className="w-16 sm:w-32 h-20 sm:h-40 bg-green-100 rounded-lg flex items-center justify-center text-lg sm:text-2xl font-bold">
              {board[6]}
            </div>
          </div>
          <div className="flex justify-center gap-2 sm:gap-4">
            {board.slice(0, 6).map((seeds, idx) => (
              <button
                key={idx}
                onClick={() => handlePitClick(idx)}
                className={`w-12 h-12 sm:w-24 md:w-32 sm:h-24 md:h-32 rounded-full bg-blue-100 hover:bg-blue-200 
                  flex items-center justify-center text-sm sm:text-xl font-bold
                  ${playerTurn === 1 ? "hover:ring-2 ring-blue-500" : ""}`}
              >
                {seeds}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalGame;
