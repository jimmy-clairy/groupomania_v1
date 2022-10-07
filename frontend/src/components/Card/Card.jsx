import React, { useEffect, useState } from 'react'
import Delete from '../Delete/Delete'
import './Card.css'

export default function Card() {
  const token = localStorage.getItem('token')
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:7000/api/post', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((dataRes) => {
        setData(dataRes)
      })
      .catch((err) => console.log({ message: err }))
  }, [token])

  return (
    <div className="Card__container">
      {data.map((item) => (
        <div className="Card" key={item._id}>
          <img src={item.imageUrl} alt="img post" />
          <div className="text">
            <p>{item.post}</p>
            <Delete postId={item._id} />
          </div>
        </div>
      ))}
    </div>
  )
}
