import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AddTheater from './pages/AddTheather'
import Teather from './pages/Teather'
import AddMovie from './pages/AddMovie'
import MovieDetails from './pages/MovieDeatils'
import TheaterList from "./pages/TheaterList";
import BookingPage from './pages/BookingPage.jsx'
import AddBooking from './pages/AddBooking.jsx'
import TicketPage from './pages/TicketPage.jsx'
import Movie from './pages/Movie.jsx'
import ProfilePage from './pages/Profile.jsx'
import AdminPage from './pages/AdminPanel.jsx'
import ConfirmPage from './pages/ConfirmPage.jsx'
import EditProfile from './pages/EditProfilePage.jsx'
import TicketHistory from './pages/TicketHistory.jsx'
import EditTheater from './pages/EditTheater.jsx'
import EditTheaterList from './pages/EditTheaterList.jsx'

function App() {

return(
  <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/signup" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addTheater' element={<AddTheater />} />
        <Route path='/Teather' element={<Teather />} />
        <Route path='/Movie' element={<Movie />} />
        <Route path='/AddMovie' element={<AddMovie />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/MovieDetails/:id' element={<MovieDetails />} />
        <Route path='/AddBooking/' element={<AddBooking />} />
        <Route path="/theater-list/:movieName" element={<TheaterList />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/ticket-history" element={<TicketHistory />} />
        <Route path="/editTheaterList" element={<EditTheaterList />} />
        <Route path="/editTheater/:id" element={<EditTheater />} />

        <Route path="/book/:theater/:movie" element={<BookingPage />} />

        <Route path="/ticket/:ticketId" element={<TicketPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  </>
)
}
export default App
