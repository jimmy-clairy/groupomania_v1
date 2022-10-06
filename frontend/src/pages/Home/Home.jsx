import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'

export default function Home() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const [data, setData] = useState([])

  useEffect(() => {
    if (!userId || !token) {
      navigate('/login')
    }
  }, [userId, token, navigate])

  useEffect(() => {
    fetch('http://localhost:7000/api/post', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((dataRes) => {
        console.log(dataRes)
        setData(dataRes)
      })
      .catch((err) => console.log({ message: err }))
  }, [token])

  return (
    <div>
      <Form />
      <div>
        {data.map((post) => (
          <Card key={post._id} post={post.post} imageUrl={post.imageUrl} />
        ))}
      </div>
    </div>
  )
}
