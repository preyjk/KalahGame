import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现登录逻辑
    console.log('Login:', username, password);
  };

  const handleGuestLogin = () => {
    // TODO: 实现访客登录逻辑
    navigate('/game-menu');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Kalah Game</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 text-base"
          >
            登录
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button 
            onClick={handleGuestLogin}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            访客登录
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            注册新账号
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 