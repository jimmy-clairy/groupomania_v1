import { useState, createContext } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [userCtx, setUserCtx] = useState({})
  // console.log(userCtx)
  const [update, setUpdate] = useState(false)
  return (
    <UserContext.Provider value={{ userCtx, setUserCtx, update, setUpdate }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
