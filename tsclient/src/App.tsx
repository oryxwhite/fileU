import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dash from './components/Dash'
import Home from './components/Home'
import Login from './components/Login/index'
import Register from './components/Register/RegisterForm'
import authHeader from './services/auth'
import { AuthProvider, useAuth, useAuthDispatch } from './hooks/context/contexxt'


function App() {
  // const [authorized, setAuthorized] = useState<boolean>()
  const state = useAuth()
  // const state = useContext(AuthContext)
  // const dispatch = useContext(AuthDispatchContext)
  // console.log(state)

  // useEffect(() => {
  //   setAuthorized(authHeader().loggedIn)
  //   console.log('loggedIn: ' + authorized)

  // })
  console.log(state)

  // import.meta.env
  return (
    <div>
 
        
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route 
          path='/login' 
          element={<Login/> } />
        <Route path='/register' element={ <Register/>} />
        <Route path='/dash' 
        element={ useAuth().authenticated
         ? <Dash/> : <Navigate to='/login' />} />

      </Routes>

    </div>
  )
}

export default App
