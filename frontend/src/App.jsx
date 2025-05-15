import Signup from './Signup/Signup'
import Login from './Login/Login'
import Mainpage from './Mainpage/Mainpage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mainpage' element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
