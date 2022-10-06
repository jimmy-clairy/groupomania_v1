import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
          <div key={post._id}>
            <img src={post.imageUrl} alt="img du post" />
            <h5>{post.imageUrl}</h5>
            <h3>{post.post}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
