import { useState } from 'react'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorTxt, setErrorTxt] = useState('')
  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    const infoUser = {
      email: email,
      password: password,
    }

    const res = await fetch('http://localhost:7000/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })

    const dataRes = await res.json()

    localStorage.setItem('userId', dataRes.userId)
    Cookies.set('token', dataRes.token, { expires: 1 })

    if (res.ok) {
      if (dataRes.userId && dataRes.token) navigate('/home')
    } else {
      if (dataRes.message) setErrorTxt(dataRes.message)
    }
  }

  return (
    <div className="login">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive && 'activeLink'
          }}
        >
          Connexion
        </NavLink>
        <NavLink to="/signup">Inscription</NavLink>
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
