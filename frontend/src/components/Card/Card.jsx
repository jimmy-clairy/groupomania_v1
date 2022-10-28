import { useEffect, useState, useContext } from 'react'
import Delete from '../Delete/DeletePost'
import { UserContext } from '../Context/UserContext'
import { fetchData } from '../../api/fetch'
import './Card.css'

export default function Card() {
  const userId = localStorage.getItem('userId')
  const [postsData, setPostsData] = useState([])
  const [usersData, setUsersData] = useState([])

  const { userCtx, update } = useContext(UserContext)

  useEffect(() => {
    const url = 'http://localhost:7000/api/'
    const forUsers = 'user'
    const forPosts = 'post'

    async function usersFetch() {
      const usersData = await fetchData(url + forUsers)
      setUsersData(usersData)
      console.log(usersData)
    }
    async function postsFetch() {
      const postsData = await fetchData(url + forPosts)
      setPostsData(postsData)
      console.log(postsData)
    }

    usersFetch()
    postsFetch()
  }, [update])

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
              <h4>{item.pseudo}</h4>
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
