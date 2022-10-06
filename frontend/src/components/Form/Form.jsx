import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const token = localStorage.getItem('token')

  const [post, setPost] = useState('')
  const [image, setImage] = useState('')

  function submitForm(e) {
    e.preventDefault()

    const data = new FormData()
    data.append('image', image)
    data.append('post', post)

    console.log(data)

    fetch('http://localhost:7000/api/post', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((dataRes) => {
        console.log(dataRes)
      })
      .catch((err) => console.log({ message: err }))
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
