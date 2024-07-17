import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    const body={
      email:email,
      password:password,
      nickname:nickname,
      phone_number: phoneNumber,
      created_date: new Date(),
      updated_date: new Date()
    }
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', body,{
        headers:{
          "Content-Type":"application/json"
        }
      });
      setMessage(`User created: ${response.data.email}`);
    } catch (error) {
      setMessage('Error creating user');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register User</h1>
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
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
