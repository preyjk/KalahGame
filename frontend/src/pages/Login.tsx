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
    <div className="login-container">
      <h1>Kalah Game</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登录</button>
      </form>
      <button onClick={handleGuestLogin}>访客登录</button>
      <button onClick={() => navigate('/register')}>注册新账号</button>
    </div>
  );
};

export default Login; 