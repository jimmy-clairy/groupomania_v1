import { useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../api/fetch'
import './Header.css'
import { UserContext } from '../Context/UserContext'

export default function Header() {
  const { userCtx, setUserCtx } = useContext(UserContext)
  const token = Cookies.get('token')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  const deconnexion = () => {
    localStorage.clear()
    Cookies.remove('token')
    userCtx.admin = false
    navigate('/')
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData(`http://localhost:7000/api/user/${userId}`)
      setUserCtx(res)
    }

    if (userId && token) {
      fetch()
    }
  }, [userId, token, setUserCtx])

  let title = ''
  userCtx.admin ? (title = 'Admin') : (title = 'Header')

  return (
    <div className={!userCtx.admin ? 'Header' : 'Header Admin'}>
      {token ? (
        <div className="container">
          <h1>{userCtx.pseudo}</h1>
          <button onClick={deconnexion}>Déconnexion</button>
        </div>
      ) : (
        <div className="container">
          <h1>Acceuil</h1>
        </div>
      )}
    </div>
  )
}
