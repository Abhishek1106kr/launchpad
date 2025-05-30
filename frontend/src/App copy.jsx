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

const upcomingEvents = [
  { day: "15", month: "MAR", title: "Tech Career Fair 2024", time: "10:00 AM - 4:00 PM", location: "Virtual Event" },
  { day: "22", month: "MAR", title: "Web Development Workshop", time: "2:00 PM - 5:00 PM", location: "Room 302, Tech Building" },
  { day: "28", month: "MAR", title: "AI & ML Conference", time: "9:00 AM - 6:00 PM", location: "Auditorium A" },
  { day: "03", month: "APR", title: "Startup Pitch Night", time: "6:00 PM - 9:00 PM", location: "Innovation Hub" },
  { day: "10", month: "APR", title: "Blockchain Workshop", time: "11:00 AM - 3:00 PM", location: "Lab 5" },
  { day: "17", month: "APR", title: "Product Management Bootcamp", time: "1:00 PM - 5:00 PM", location: "Room 210" },
  { day: "24", month: "APR", title: "Women in Tech Panel", time: "4:00 PM - 6:00 PM", location: "Virtual Event" },
  { day: "30", month: "APR", title: "Cloud Computing Seminar", time: "3:00 PM - 5:00 PM", location: "Room 101" }
];
