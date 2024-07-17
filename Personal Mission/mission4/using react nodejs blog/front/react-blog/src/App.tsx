import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
        email:email,
        password:password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      });
      setMessage(`Logged in as: ${response.data.email}`);
      // 여기서 로그인 성공 후 다음 단계로 네비게이션 또는 다른 작업을 처리할 수 있습니다.
    } catch (error) {
      setMessage('Invalid credentials');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
