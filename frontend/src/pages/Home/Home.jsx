import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login')
    }
  }, [userId, token, navigate])

  return (
    <div className="Home">
      <Form />
      <Card />
    </div>
  )
}
