import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(()=> {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        return token ? { token, role } : null
    })
  

  const loginHandler = (token, role) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    setUser({ token, role })
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)