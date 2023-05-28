import React, { useState } from 'react';
import { usersInstance } from '../../axios/movieIntance';
import { Navigate } from 'react-router-dom';


const Login = () => {

  const [formData, setData] = useState({ email: '', password: '' });

  const { accessToken } = JSON.parse(localStorage.getItem('user_details') || '{}');

  const [isSignedIn, setSignedIn] = useState(accessToken !== undefined);

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await usersInstance.post('/login', formData);
    localStorage.setItem('user_details', JSON.stringify(response.data));
    setSignedIn(true);
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: '50px',
        display: 'inline-block',
      }}
    >
      <form
        style={{
          border: '1px solid',
          padding: '16px',
          textAlign: 'left'
        }}
        onSubmit={onSubmit}
      >
        <label htmlFor='email' >Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder='eg: john@gmail.com'
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor='password' >Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Enter Password'
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login;