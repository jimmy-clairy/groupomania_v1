import { useEffect, useState, useContext } from 'react'
import Cookies from 'js-cookie'
import Delete from '../Delete/DeletePost'
import { UserContext } from '../Context/UserContext'
import './Card.css'

export default function Card() {
  const token = Cookies.get('token')
  const userId = localStorage.getItem('userId')
  const [data, setData] = useState([])
  const [dataUsers, setDataUsers] = useState([])

  const { userCtx, update } = useContext(UserContext)

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
  }, [token, update])

  useEffect(() => {
    const fetchDataUsers = async () => {
      const response = await fetch('http://localhost:7000/api/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const dataResponse = await response.json()
      setDataUsers(dataResponse)
    }

    fetchDataUsers().catch(() => console.log({ message: 'Bad url' }))
  }, [token, update, data])

  if (data && dataUsers) {
    for (const post of data) {
      const [user] = dataUsers.filter((user) => user._id === post.posterId)
      post.pseudo = user.pseudo
    }
  }

  console.log('mise a jour')
  return (
    <div className="Card__container">
      {data.map((item) => (
        <div className="Card" key={item._id}>
          <img src={item.imageUrl} alt="img post" />
          <div className="text">
            <div>
              <h5>{item.pseudo}</h5>
              <h5>{item.posterId}</h5>
              <p>{item.post}</p>
            </div>
            {userCtx.admin ? (
              <div className="icon">
                <Delete postId={item._id} />
              </div>
            ) : (
              userId === item.posterId && (
                <div className="icon">
                  <Delete postId={item._id} />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
