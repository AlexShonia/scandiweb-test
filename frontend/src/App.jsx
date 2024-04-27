import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import AddScreen from "./screens/AddScreen"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/add" element={<AddScreen/>} />
      </Routes>
    </Router>
  )
}

export default App
