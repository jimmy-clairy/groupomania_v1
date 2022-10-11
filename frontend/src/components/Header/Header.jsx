import React, { useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import { UserContext } from '../Context/UserContext'

export default function Header() {
  const { userCtx, setUserCtx } = useContext(UserContext)
  const token = Cookies.get('token')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  function deconnexion() {
    localStorage.clear()
    Cookies.remove('token')
    userCtx.admin = false
    navigate('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:7000/api/user/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      const dataResponse = await response.json()

      setUserCtx(dataResponse)
    }

    if (userId && token) {
      fetchData()
    }
  }, [userId, token, setUserCtx])

  let title = ''
  userCtx.admin ? (title = 'Admin') : (title = 'Header')

  return (
    <div className={!userCtx.admin ? 'Header' : 'Header Admin'}>
      <h1>{title}</h1>

      <div>
        {token && (
          <div>
            <button onClick={() => deconnexion()}>Déconnexion</button>
            <h3>{userCtx.pseudo}</h3>
          </div>
        )}
      </div>
    </div>
  )
}
