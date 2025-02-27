import React from "react";
import { useNavigate } from "react-router-dom";

const GameMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">选择游戏模式</h1>
        <div className="space-y-3 sm:space-y-4">
          <button 
            onClick={() => navigate("/local-game")}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            本地双人对战
          </button>
          <button 
            onClick={() => navigate("/ai-game")}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            人机对战
          </button>
          <button 
            onClick={() => navigate("/online-game")}
            className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition duration-200"
          >
            在线对战
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-200"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
