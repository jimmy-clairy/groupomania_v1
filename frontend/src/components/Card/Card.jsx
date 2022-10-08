import React, { useEffect, useState } from 'react'
import Delete from '../Delete/DeletePost'
import './Card.css'

export default function Card() {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:7000/api/post', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((dataResponse) => {
        setData(dataResponse)
      })
      .catch((err) => console.log({ message: err }))
  }, [token, data])

  return (
    <div className="Card__container">
      {data.map((item) => (
        <div className="Card" key={item._id}>
          <img src={item.imageUrl} alt="img post" />
          <div className="text">
            <div>
              <h5>{item.posterId}</h5>
              <p>{item.post}</p>
            </div>

            {userId === item.posterId && (
              <div className="icon">
                <Delete postId={item._id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
