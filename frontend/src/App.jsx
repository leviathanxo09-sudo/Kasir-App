
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Kasir from './pages/kasir.jsx'
import Products from './pages/products.jsx'
import History from './pages/history.jsx'

function App() {
  return (

     <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={
        <ProtectedRoute role='admin'>
          <Dashboard />
        </ProtectedRoute>
      }/>
      <Route path='/kasir' element={
        <ProtectedRoute role='admin'>
          <Kasir />
        </ProtectedRoute>
      }/>
      <Route path='/products' element={
        <ProtectedRoute role='admin'>
          <Products />
        </ProtectedRoute>
      }/>
      <Route path='/history' element={
        <ProtectedRoute role='admin'>
          <History />
        </ProtectedRoute>
      }/>
      <Route path='*' element={<Navigate to='/login' />} />
      
    </Routes>
    
  )
}

export default App
