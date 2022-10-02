import React, { useState } from 'react'

export default function Signup() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    if (data.error.errors.pseudo) console.log('pseudo déja pris ')
    if (data.error.errors.email) console.log('email déja pris ')
  }

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Pseudo"
          minLength={3}
          value={pseudo}
          required
          onChange={(e) => setPseudo(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
    </div>
  )
}
