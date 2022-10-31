import { useState } from 'react'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPseudo, setErrorPseudo] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    const infoUser = {
      pseudo: pseudo,
      email: email,
      password: password,
    }

    const response = await fetch('http://localhost:7000/api/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })

    const dataRes = await response.json()

    if (response.ok) {
      const response = await fetch('http://localhost:7000/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoUser),
      })

      const dataRes = await response.json()

      localStorage.setItem('userId', dataRes.userId)
      Cookies.set('token', dataRes.token, { expires: 1 })

      if (dataRes.userId && dataRes.token) navigate('/home')
    } else {
      if (dataRes.error.errors.pseudo) setErrorPseudo('Pseudo déja utilisé')
      if (dataRes.error.errors.email) setErrorEmail('Email déja utilisé')
    }
  }

  return (
    <div className="signup">
      <div>
        <NavLink to="/">Connexion</NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => {
            return isActive && 'activeLink'
          }}
        >
          Inscription
        </NavLink>
      </div>
      <h2>Inscription</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          minLength={3}
          maxLength={20}
          value={pseudo}
          required
          onChange={(e) => {
            setErrorPseudo('')
            setPseudo(e.target.value)
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value)
            setErrorEmail('')
          }}
        />
        <input
          type="password"
          placeholder="Password"
          minLength={3}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Valider</button>
      </form>
      {errorPseudo && <p className="error">{errorPseudo}</p>}
      {errorEmail && <p className="error">{errorEmail}</p>}
    </div>
  )
}
