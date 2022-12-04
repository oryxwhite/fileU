import { Routes, Route, Navigate } from 'react-router-dom'
import Dash from './components/Dash'
import Home from './components/Home'
import Login from './components/Login/index'
import Register from './components/Register/RegisterForm'
import { useAuth } from './hooks/context/contexxt'
import Layout from './components/Layout/layout'

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
         </Route>

      </Routes>

    </div>
  )
}

export default App
