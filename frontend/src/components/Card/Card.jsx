import { useEffect, useState, useContext } from 'react'
import Cookies from 'js-cookie'
import Delete from '../Delete/DeletePost'
import { UserContext } from '../Context/UserContext'
import './Card.css'

export default function Card() {
  const token = Cookies.get('token')
  const userId = localStorage.getItem('userId')
  const [postsData, setPostsData] = useState([])
  const [usersData, setUsersData] = useState([])

  const { userCtx, update } = useContext(UserContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:7000/api/post', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (res.ok === true) return res.json()
      throw new Error('Impossible de contacter le serveur')
    }

    fetchPosts().then((data) => setPostsData(data))
  }, [token, update])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:7000/api/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (res.ok === true) return res.json()
      throw new Error('Impossible de contacter le serveur')
    }

    fetchUsers().then((data) => setUsersData(data))
  }, [token, update])

  // Add pseudo at posts
  if (usersData && postsData) {
    for (const user of usersData) {
      for (const post of postsData) {
        if (user._id === post.posterId) {
          post.pseudo = user.pseudo
        }
      }
    }
  }

  return (
    <div className="Card__container">
      {postsData.map((item) => (
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
