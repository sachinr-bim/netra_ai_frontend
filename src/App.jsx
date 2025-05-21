import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import { logout } from './reduxToolkit/slices/authSlice' // Update with correct path

// Components
import Navigation from './components/Navigation/Navigation'

// Styling
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userToken') ? true : false
  )
  const dispatch = useDispatch()

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "px-4 py-2 bg-[var(--theme-color)] text-white rounded-sm m-2 hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)]",
        cancelButton: "p-4 py-2 bg-red-500 text-white rounded-sm hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch Redux logout action (removes token from localStorage)
        dispatch(logout())

        window.location.reload()
        // Update local state
        setIsLoggedIn(false)
        
        swalWithBootstrapButtons.fire({
          title: "Logged out!",
          text: "Successfully Logged out",
          icon: "success"
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Logout Cancelled :)",
          icon: "error"
        })
      }
    })
  }

  return (
    <div>
      <Navigation 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />
    </div>
  )
}

export default App