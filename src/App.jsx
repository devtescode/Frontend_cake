import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepagecakes from './components/Homefolder/Homepagecakes'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Userdashboard from './components/Dashboard/Userdashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Homepagecakes/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/userdashboard' element={<Userdashboard/>}/>
    </Routes>
    </>
  )
}

export default App
