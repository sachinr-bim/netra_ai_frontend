import { useEffect } from "react";

// Redux
import { useSelector,useDispatch } from "react-redux";
import { getCurrentUser } from "../../reduxToolkit/slices/authSlice";

// Packages and Libraries
import { Link, useLocation } from "react-router-dom";

// Icons
import EditIcon from "../../assets/icons/EditIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";

// Images
import netraIcon from '../../assets/images/netraIcon.png'

export default function Sidebar({ sideBarContent, onContentChange, handleLogout }) {
    
    const dispatch = useDispatch()
    const Location = useLocation();

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

    return (
        <div className="w-75 bg-white text-gray-800 p-4 min-h-screen">
            
            {/* Logo */}
            <div className="flex justify-center">
                <img src={netraIcon} alt="Netra3 Logo" className="w-45 mt-4" />
            </div>
            <h1 className="flex justify-center mt-2 text-lg text-[var(--theme-color)]">Your AI Guardian</h1>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-6">
                <div className="relative">
                    <img src={userInfo?.profile_picture || "https://images2.alphacoders.com/156/thumb-1920-156022.jpg"} alt="Profile" className="w-30 h-30 p-2 rounded-full border-4 border-orange-200" />
                    <button className="absolute top-1 right-1 bg-[var(--theme-color)] text-white p-1 rounded-full text-xs">
                        <EditIcon size={15} height="1em" width="1em" />
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mt-2">Mr. {userInfo.lastname}</h2>
                <p className="text-gray-500 text-sm">{userInfo.location ? `Shopowner of ${userInfo.location}` : 'No Bio Available'}</p>
            </div>

            <ul className="mt-6">
                {sideBarContent.map((ele, i) => {
                    const isActive = Location.pathname === ele.path;

                    return (
                        <Link to={ele.path} key={i}>
                            <li
                                className={`mt-2 p-3 ${
                                    isActive ? "bg-[var(--theme-color)] text-white" : "bg-white text-black hover:bg-[var(--theme-color)] hover:text-white"
                                } rounded-lg cursor-pointer flex items-center`}
                                onClick={() => onContentChange(ele.name)}
                            >
                               <button className={`${isActive ? "bg-white text-[var(--theme-color)]" : "bg-[#e6e6e6] text-black" } p-2 rounded-lg mr-4 hover:bg-white hover:text-[var(--theme-color)]`}>{ele.icon}</button> 
                                {ele.name}
                            </li>
                        </Link>
                    );
                })}
                <li className="mt-25 p-3 bg-white text-black rounded-lg cursor-pointer flex items-center hover:bg-[var(--theme-color)] hover:text-white" onClick={handleLogout}>
                    <button className="bg-[#e6e6e6] text-black p-2 rounded-lg mr-4" onClick={handleLogout} ><LogoutIcon /></button> 
                    Logout
                </li>
            </ul>
        </div>
    );
}