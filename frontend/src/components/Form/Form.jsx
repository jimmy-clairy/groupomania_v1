import { useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { fetchData } from '../../api/fetch'
import './Form.css'

export default function Form() {
  const [post, setPost] = useState('')
  const [image, setImage] = useState('')
  const { update, setUpdate } = useContext(UserContext)

  const submitForm = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('image', image)
    data.append('post', post)

    try {
      const res = await fetchData(
        'http://localhost:7000/api/post',
        'POST',
        data
      )
      console.log(res)
      setPost('')
      setUpdate(!update)
    } catch (error) {
      console.error({ message: 'Bad url' })
    }
  }
  return (
    <div className="Form">
      <h2>Formulaires</h2>
      <form onSubmit={submitForm}>
        <div>
          <input
            className="inputfile"
            type="file"
            name="file"
            accept=".jpg,.jpeg,.png,"
            id="inputForm"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="inputForm">Choose your picture ...</label>
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
