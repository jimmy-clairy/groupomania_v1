import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorTxt, setErrorTxt] = useState('')
  const navigate = useNavigate()

  async function submitForm(e) {
    e.preventDefault()
    const infoUser = {
      email: email,
      password: password,
    }

    const response = await fetch('http://localhost:7000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })

    const dataRes = await response.json()

    localStorage.setItem('userId', dataRes.userId)
    localStorage.setItem('token', dataRes.token)

    if (dataRes.userId && dataRes.token) {
      navigate('/home')
    }

    if (!response.ok) {
      if (dataRes.message) setErrorTxt(dataRes.message)
    }
  }

  return (
    <div className="login">
      <div>
        <NavLink
          to="/login"
          className={({ isActive }) => {
            return isActive && 'activeLink'
          }}
        >
          Connexion
        </NavLink>
        <NavLink to="/">Inscription</NavLink>
      </div>
      <h2>Connexion</h2>
      <form onSubmit={submitForm}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value)
            setErrorTxt('')
          }}
        />
        <input
          type="password"
          placeholder="Password"
          minLength={3}
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorTxt('')
          }}
        />
        <button>Valider</button>
      </form>
      {errorTxt && <p className="error">{errorTxt}</p>}
    </div>
  )
}
