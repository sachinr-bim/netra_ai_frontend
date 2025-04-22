import React from 'react'

// Packages and Libraries
import { Routes,Route } from 'react-router-dom'

// Components
import ColorTheme from "../ColorTheme"
import Alerts from '../Alerts';

// Icons
//import MessageIcon from "../../assets/icons/MessageIcon";
import NotificationIcon from "../../assets/icons/NotificationsIcon";
import { ColorIcon } from "../../assets/icons/ColorIcon";

export default function Navbar({currentContent,toggleThemeDropdown,routes,handleSidebar,dropdownRef,notificationRef,isThemeDropdownOpen,setIsThemeDropdownOpen,isNotificationDropdownOpen,setIsNotificationDropdownOpen,toggleNotificationDropdown}) {
  return (
    <div className="flex-grow p-6">
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
            <button onClick={handleSidebar} className="p-2 bg-gray-100 border-2 border-gray-300 rounded-md hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h1 className="text-4xl font-600 m-4">{currentContent}</h1>
        </div>
    <div className="flex items-center gap-3">
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleThemeDropdown}
        className={`p-2 rounded-md transition-colors duration-200 ${
          isThemeDropdownOpen 
            ? `bg-[var(--theme-color)] text-white`
            : `bg-gray-100 border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white`
        }`}
      >
        <ColorIcon width={24} height={24} fontSize="1em" />
      </button>
      
      {/* Reusing your ThemeSettings component as dropdown */}
      {isThemeDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200 transform transition-all duration-200 origin-top-right overflow-hidden">
          <ColorTheme compactMode={true} onClose={() => setIsThemeDropdownOpen(false)} />
        </div>
      )}
    </div>

        {/* <button className="p-2 bg-gray-100 border border-gray-300 text-gray-600 rounded-md hover:bg-[var(--theme-color)] hover:text-white">
            <MessageIcon width={24} height={24} fontSize="1em" />
        </button> */}
    <div className='relative' ref={notificationRef} >
      <button className={`p-2 rounded-md transition-colors duration-200 ${
          isNotificationDropdownOpen
            ? `bg-[var(--theme-color)] text-white`
            : `bg-gray-100 border border-gray-300 text-gray-400 hover:bg-[var(--theme-color)] hover:text-white`
        }`} onClick={toggleNotificationDropdown}>
        <NotificationIcon width={24} height={24} fontSize="1em" />
      </button>

      {isNotificationDropdownOpen && (
        <div className="absolute right-0 mt-2 w-100 bg-white rounded-md shadow-lg z-50 border border-gray-200 transform transition-all duration-200 origin-top-right overflow-hidden">
          <Alerts compactMode={true} onClose={() => setIsNotificationDropdownOpen(false)} />
        </div>
      )}
    </div>    
        
    </div>
</div>
<Routes>
    {routes.map((ele, i) => { return <Route key={i} path={ele.path} element={ele.element} /> })}
</Routes>
</div>
  )
}
