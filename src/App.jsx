import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepagecakes from './components/Homefolder/Homepagecakes'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Userdashboard from './components/Dashboard/Userdashboard'
import Adminlogin from './components/Adminlogin/Adminlogin'
import Notfound from './components/Notfound/Notfound'
import ProtectedRoute from './components/UserProtectedRoute/ProtectedRoute'
import Admindashboard from './components/Admindashboard/Admindashboard'
import Viewscake from './components/Dashboard/Viewscake'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepagecakes />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
    
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <Userdashboard />
            </ProtectedRoute>
          }
        >
          <Route path="viewscake/:id" element={<Viewscake />} />
        </Route>

        <Route path='/adlogin' element={<Adminlogin />} />
        <Route path='/admindashboard' element={<Admindashboard />} />

        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
