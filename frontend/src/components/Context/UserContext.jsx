import { useState, createContext } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [userCtx, setUserCtx] = useState({})
  console.log(userCtx)

  return (
    <UserContext.Provider value={{ userCtx, setUserCtx }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
