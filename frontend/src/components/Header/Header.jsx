import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  function deconnexion() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="header">
      <h1>Header Jimmy</h1>
      {token && <button onClick={() => deconnexion()}>Déconnexion</button>}
    </div>
  )
}
