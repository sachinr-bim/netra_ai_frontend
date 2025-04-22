import { useState } from 'react'

// Packages and Libraries
import 'leaflet/dist/leaflet.css'

// Components
import Navigation from './components/Navigation/Navigation'

// Styling
import './App.css'

function App() {

  const [isLoggedIn,setIsloggedIn] = useState(false)

  const handleLogin = () => {
    setIsloggedIn(!isLoggedIn)
  }

  return (
    <div>
      <Navigation handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
