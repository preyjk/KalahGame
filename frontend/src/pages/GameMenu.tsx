import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="game-menu-container">
      <h1>选择游戏模式</h1>
      <div className="menu-buttons">
        <button onClick={() => navigate("/local-game")}>本地双人对战</button>
        <button onClick={() => navigate("/ai-game")}>人机对战</button>
        <button onClick={() => navigate("/online-game")}>在线对战</button>
        <button onClick={() => navigate("/login")}>退出登录</button>
      </div>
    </div>
  );
};

export default GameMenu;
