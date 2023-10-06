import { useEffect, useState } from 'react'
import { AuthContext } from './userContext'
import { auth } from '../../firebase'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser)
    })
    return subscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider
