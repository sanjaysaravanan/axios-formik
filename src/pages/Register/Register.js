import React, { useState } from 'react';
import { usersInstance } from '../../axios/movieIntance.js';
import { Navigate } from 'react-router-dom';


const Register = () => {

  const [formData, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { accessToken } = JSON.parse(localStorage.getItem('user_details') || '{}');

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    usersInstance.post('', formData);
  }

  if (accessToken !== undefined) {
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
        <label htmlFor='name' >Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Enter name'
          onChange={handleChange}
        />
        <br />
        <br />
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

export default Register;