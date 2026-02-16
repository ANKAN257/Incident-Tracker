
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from  './pages/HomePage'
import IncidentDetailPage from './components/IncidentDetailPage'
import CreateIncidentPage from './components/CreateIncidentPage'

function App() {


  return (
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/incident/:id" element={<IncidentDetailPage />} />
        <Route path="/incident/new" element={<CreateIncidentPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
