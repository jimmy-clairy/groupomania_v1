import React, { useEffect, useState } from 'react'
import Delete from '../Delete/DeletePost'
import './Card.css'

export default function Card() {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:7000/api/post', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const dataResponse = await response.json()
      setData(dataResponse)
    }

    fetchData().catch(() => console.log({ message: 'Bad url' }))
  }, [token, data])

  return (
    <div className="Card__container">
      {data.map((item) => {
        return (
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
        )
      })}
    </div>
  )
}
