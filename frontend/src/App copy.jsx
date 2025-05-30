import Signup from './Signup/Signup'
import Login from './Login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productpage' element={<Productpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
