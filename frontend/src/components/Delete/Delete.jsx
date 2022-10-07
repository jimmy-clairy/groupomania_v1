import React from 'react'
import iconDelete from '../../assets/bin.png'
import './Delete.css'

export default function Delete(props) {
  const token = localStorage.getItem('token')

  async function deletePost(postId) {
    const response = await fetch(`http://localhost:7000/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    const dataRes = await response.json()
    console.log(dataRes)
    window.location.reload()
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
