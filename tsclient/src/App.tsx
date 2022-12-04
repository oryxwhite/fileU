import { Routes, Route, Navigate } from 'react-router-dom'
import Dash from './components/Dash'
import Home from './components/Home'
import Login from './components/Login/index'
import Register from './components/Register'
import { useAuth } from './hooks/context/context'
import Layout from './components/Layout/layout'
import Logout from './components/Logout'

function App() {
  const state = useAuth()

  console.log(state)

  return (
    <div>
 
        
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={ <Home/> } />
          <Route 
            path='/login' 
            element={<Login/> } />
          <Route path='/register' element={ <Register/>} />
          <Route path='/dash' 
          element={ useAuth().authenticated
          ? <Dash/> : <Navigate to='/login' />} />
          <Route path='/logout' element={<Logout />} />
         </Route>

      </Routes>

    </div>
  )
}

export default App
