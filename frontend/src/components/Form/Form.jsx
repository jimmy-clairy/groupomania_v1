import { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import './Form.css'
import { UserContext } from '../Context/UserContext'

export default function Form() {
  const token = Cookies.get('token')

  const [post, setPost] = useState('')
  const [image, setImage] = useState('')
  const { update, setUpdate } = useContext(UserContext)

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
      setUpdate(!update)
    } catch (error) {
      console.log({ message: 'Bad url' })
    }
  }
  return (
    <div className="Form">
      <h2>Formulaires</h2>
      <form onSubmit={submitForm}>
        {/* <input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}
        <div className="input-group ">
          <div className="input-group-prepend">
            <span className="input-group-text">Upload</span>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
        </div>
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
