import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dash from './components/Dash'
import Home from './components/Home'
import Login from './components/Login/index'
import Register from './components/Register/RegisterForm'
import authHeader from './services/auth'


function App() {
  const [authorized, setAuthorized] = useState<boolean>()

  useEffect(() => {
    setAuthorized(authHeader().loggedIn)
    console.log('loggedIn: ' + authorized)

  })

  import.meta.env
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route 
          path='/login' 
          element={<Login/> } />
        <Route path='/register' element={ <Register/>} />
        <Route path='/dash' 
        element={ 
        authorized ? <Dash/> : <Navigate to='/login' />} />

      </Routes>
    </div>
  )
}

export default App
