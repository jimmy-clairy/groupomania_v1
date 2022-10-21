import { useEffect, useContext } from 'react'
import { UserContext } from '../../components/Context/UserContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const { userCtx } = useContext(UserContext)

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login')
    }
  }, [userId, token, navigate])

  return (
    <div className="Home">
      {!userCtx.admin && <Form />}
      <Card />
    </div>
  )
}
