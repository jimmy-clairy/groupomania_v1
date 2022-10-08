import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const token = localStorage.getItem('token')

  const [post, setPost] = useState('')
  const [image, setImage] = useState('')

  const submitForm = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('image', image)
    data.append('post', post)

    try {
      const response = await fetch('http://localhost:7000/api/post', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: data,
      })

      const dataRes = await response.json()
      console.log(dataRes)
      setPost('')
    } catch (error) {
      console.log({ message: 'Bad url' })
    }
  }
  return (
    <div className="Form">
      <h2>Formulaires</h2>
      <form onSubmit={submitForm}>
        <input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          className="inputPost"
          type="text"
          name="post"
          placeholder="Votre post"
          maxLength={250}
          required
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button>Valider</button>
      </form>
    </div>
  )
}
