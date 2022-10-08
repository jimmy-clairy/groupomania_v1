import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  function deconnexion() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="Header">
      <h1>Header Jimmy</h1>
      <div>
        {token && <button onClick={() => deconnexion()}>Déconnexion</button>}
        <p>{userId}</p>
      </div>
    </div>
  )
}
