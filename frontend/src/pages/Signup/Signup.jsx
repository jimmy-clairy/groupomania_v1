import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPseudo, setErrorPseudo] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  async function submitForm(e) {
    e.preventDefault()
    const infoUser = {
      pseudo: pseudo,
      email: email,
      password: password,
    }

    console.log(infoUser)

    const response = await fetch('http://localhost:7000/api/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })

    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      if (data.error.errors.pseudo) setErrorPseudo('Pseudo déja utilisé')
      if (data.error.errors.email) setErrorEmail('Email déja utilisé')
    }
  }

  return (
    <div className="signup">
      <div>
        <Link to="/login">Connexion</Link>
        <Link to="/">Inscription</Link>
      </div>
      <h2>Inscription</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          minLength={3}
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
