import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState('')
  const [errorTxt, setErrorTxt] = useState('')

  async function submitForm(e) {
    e.preventDefault()
    const infoUser = {
      email: email,
      password: password,
    }

    console.log(infoUser)

    const response = await fetch('http://localhost:7000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })

    const dataRes = await response.json()
    console.log(dataRes)
    setData(dataRes)
    if (!response.ok) {
      if (dataRes.message) setErrorTxt(dataRes.message)
    }
  }

  return (
    <div className="login">
      <div>
        <Link to="/login">Connexion</Link>
        <Link to="/">Inscription</Link>
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
      {data && <p>UserId : {data.userId}</p>}
      {errorTxt && <p className="error">{errorTxt}</p>}
    </div>
  )
}
