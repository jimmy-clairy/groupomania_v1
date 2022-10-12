import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import iconDelete from '../../assets/bin.png'
import './DeletePost.css'
import { UserContext } from '../Context/UserContext'

export default function DeletePost(props) {
  const token = Cookies.get('token')
  const { update, setUpdate } = useContext(UserContext)

  const deletePost = async (postId) => {
    const response = await fetch(`http://localhost:7000/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    setUpdate(!update)
    const dataRes = await response.json()
    console.log(dataRes)
  }

  return (
    <div className="Delete">
      <img
        className="iconDelete"
        src={iconDelete}
        alt="Trash"
        onClick={() => deletePost(props.postId)}
      />
    </div>
  )
}
