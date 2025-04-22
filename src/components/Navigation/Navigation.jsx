import { useState, useEffect, useRef } from "react";

// Packages and Libraries
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

// Components
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "../Dashboard/Dashboard";
import ShopManagement from "../Shops/ShopManagement/ShopManagement";
import ShopAdmin from "../Shops/ShopAdmin/ShopAdmin";
import PaymentHistory from "../Payment/PaymentHistory";
import Anomaly from "../Anomaly/Anomaly";
import Settings from "../Settings/Settings";
import Subscription from "../Subscription/Subscription";
import ShopDetails from "../Shops/ShopDetails/ShopDetails";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import PasswordResetSuccess from "../Auth/Success/PasswordResetSuccess";
import SignupSuccess from "../Auth/Success/SignupSuccess";
import Support from "../Support/Support";
import SupportRequest from "../Support/SupportRequest";

// Icons
import HomeIcon from "../../assets/icons/HomeIcon";
import ShopAdminIcon from "../../assets/icons/ShopAdminIcon";
import PaymentIcon from "../../assets/icons/PaymentIcon";
import AnomalyIcon from "../../assets/icons/AnomalyIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import SupportIcon from "../../assets/icons/SupportIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import EditIcon from "../../assets/icons/EditIcon";

export default function Navigation({handleLogin,isLoggedIn}) {

    const Location = useLocation()
    const pathName = Location.pathname

    const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const notificationRef = useRef(null)

    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [currentContent, setCurrentContent] = useState("Dashboard");

    // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsThemeDropdownOpen(false);
      }else if (notificationRef.current && !notificationRef.current.contains(e.target)){
        setIsNotificationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleThemeDropdown = () => setIsThemeDropdownOpen(!isThemeDropdownOpen)

  const toggleNotificationDropdown = () => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)

    // ProtectedRoute component
    const ProtectedRoute = ({ children }) => {
        if (!isLoggedIn) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    // PublicRoute component (for login/signup when already logged in)
    const PublicRoute = ({ children }) => {
        if (isLoggedIn) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    const sideBarContent = [
        { name: "Dashboard", path: "/", icon: <HomeIcon /> },
        { name: "Shop Management", path: "/shopManagement", icon: <EditIcon size={20} height="1em" />},
        { name: "Shop Admin", path: "/shopAdmin", icon: <ShopAdminIcon /> },
        { name: "Payment History", path: "/paymentList", icon: <PaymentIcon /> },
        { name: "Anomaly List", path: "/anomalyList", icon: <AnomalyIcon /> },
        { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
        { name: "Support", path: "/support", icon: <SupportIcon /> },
        { name: "Reports", path: "/reports", icon: <ReportsIcon />}
    ];

    const routes = [
        { path: '/', element: <ProtectedRoute> <Dashboard setSideBarOpen={setSideBarOpen} /> </ProtectedRoute>  }, 
        { path: '/shopManagement', element: <ProtectedRoute> <ShopManagement /> </ProtectedRoute>  },
        { path: '/shopDetails/:id', element: <ProtectedRoute> <ShopDetails /> </ProtectedRoute>  },
        { path: '/shopAdmin', element: <ProtectedRoute> <ShopAdmin /> </ProtectedRoute> },
        { path: '/paymentList', element: <ProtectedRoute> <PaymentHistory /> </ProtectedRoute>  },
        { path: '/anomalyList', element: <ProtectedRoute> <Anomaly /> </ProtectedRoute> },
        { path: '/settings', element: <ProtectedRoute> <Settings /> </ProtectedRoute> },
        { path: '/subscription', element: <ProtectedRoute> <Subscription /> </ProtectedRoute> },
        { path: '/signup', element: <PublicRoute> <Signup /> </PublicRoute>  },
        { path: '/login', element: <PublicRoute> <Login handleLogin={handleLogin} /> </PublicRoute> },
        { path: '/forgotPassword', element: <PublicRoute> <ForgotPassword /> </PublicRoute> },
        { path: '/resetPassword', element: <PublicRoute> <ResetPassword /> </PublicRoute> },
        { path: '/passwordResetSuccess', element: <PublicRoute> <PasswordResetSuccess handleLogin={handleLogin} /> </PublicRoute> },
        { path: '/signupSuccess', element: <PublicRoute> <SignupSuccess handleLogin={handleLogin} /> </PublicRoute> },
        { path: '/support', element: <ProtectedRoute> <Support /> </ProtectedRoute> },
        { path: '/supportRequest', element: <ProtectedRoute> <SupportRequest /> </ProtectedRoute> },
    ];

    const nonAuthRoutes = [
        { path: "/login", element: <Login handleLogin={handleLogin} /> },
        { path: "/signup", element: <Signup /> },
        { path: "/forgotPassword", element: <ForgotPassword /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "/passwordResetSuccess", element: <PasswordResetSuccess handleLogin={handleLogin} /> },
        { path: "/signupSuccess", element: <SignupSuccess handleLogin={handleLogin} /> },
        { path: '/subscription', element: <Subscription /> },
        { path: "*", element: <Navigate to="/login" replace /> }
    ]

    const handleSidebar = () => {
        setSideBarOpen(!sideBarOpen);
    };

    const handleContentChange = (contentName) => {
        setCurrentContent(contentName);
    };

    const handleLogout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "px-4 py-2 bg-[var(--theme-color)] text-white rounded-sm m-2 hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)]",
              cancelButton: "p-4 py-2 bg-red-500 text-white rounded-sm hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
            },
            buttonsStyling: false
          });
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
                handleLogin()
              swalWithBootstrapButtons.fire({
                title: "Logged out!",
                text: "Successfully Logged out",
                icon: "success"
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Logout Cancelled :)",
                icon: "error"
              });
            }
          });
    }

    // Check if current route is subscription
    const isSubscriptionPage = pathName === '/subscription';

    if (isSubscriptionPage) {
        return <Subscription />;
    }

    return (
        <>
           {isLoggedIn ? (

            <div className={`flex bg-gray-100`}>
            {sideBarOpen && <Sidebar sideBarContent={sideBarContent} onContentChange={handleContentChange} handleLogout={handleLogout} />}
            
           <Navbar currentContent={currentContent} toggleThemeDropdown={toggleThemeDropdown} routes={routes} handleSidebar={handleSidebar} dropdownRef={dropdownRef} notificationRef={notificationRef} isThemeDropdownOpen={isThemeDropdownOpen} setIsThemeDropdownOpen={setIsThemeDropdownOpen} isNotificationDropdownOpen={isNotificationDropdownOpen} setIsNotificationDropdownOpen={setIsNotificationDropdownOpen} toggleNotificationDropdown={toggleNotificationDropdown} />

        </div>

        ) : (
            <Routes>
                {nonAuthRoutes.map((ele, i) => { return <Route key={i} path={ele.path} element={ele.element} /> })}
            </Routes> )
    }
    </>
    );
}