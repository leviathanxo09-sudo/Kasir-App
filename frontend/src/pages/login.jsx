import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import './login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { loginHandler } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
        const res = await login({username, password})
        const { token, role } = res.data
        loginHandler(token, role)
        navigate(role === 'admin' ? '/dashboard' : '/kasir')
    } catch (err) {
        setError('Login gagal. Periksa username dan password.')
    } 
}

  return (
    <div className='login-container'>
      <form>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <div className='usr'>
       <label>
        <FontAwesomeIcon icon={faUser} />
        </label>
       <input 
          type='text'
          placeholder='username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='pass'>
        <label>
          <FontAwesomeIcon icon={faLock} />
          </label>
          <input 
            type='password'
            placeholder='password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        
            <button type='button' onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}
