// React
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Icons
import { LocationIcon } from "../../../assets/icons/LocationIcon";

// Components
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

export default function ShopAdmin() {
    const shopAdmins = useSelector((state) => state.shops.admins);
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [editingAdmin, setEditingAdmin] = useState(null);

    const handleAddOpen = () => setIsAddOpen(!isAddOpen)

    const handleOpen = (admin) => setEditingAdmin(admin)

    const handleClose = () => setEditingAdmin(null)

    return (
        <div className="bg-gray-100">

            {/* Add Admin Modal */}
                <AddAdmin isOpen={isAddOpen} onClose={handleAddOpen}  />
            {/* Add Admin Modal End */}

            {/* Edit Admin Modal */}
            {editingAdmin && (
                <EditAdmin isOpen={!!editingAdmin} onClose={handleClose} id={editingAdmin.id} image={editingAdmin.image} name={editingAdmin.name} 
                location={editingAdmin.location} shop={editingAdmin.shop} email={editingAdmin.email} phone={editingAdmin.phone} />
            )}
            {/* Edit Admin Modal End */}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-xl mb-4 md:mb-6 gap-3 md:gap-4">
                <h1 className="text-xl md:text-2xl font-bold">Shop Admins</h1>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 md:gap-3">
                    <input
                        type="text"
                        placeholder="Search admins..."
                        className="border p-2 rounded-lg w-full md:w-64"
                    />
                    <button className="bg-[var(--theme-color)] hover:bg-white text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors duration-200 whitespace-nowrap text-sm md:text-base" onClick={handleAddOpen}>
                        Add Admin
                    </button>
                </div>
            </div>
    
            {/* Admins Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {shopAdmins.map((ele, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 md:p-4 relative hover:shadow-md shadow-[var(--theme-color)] hover:border border-[var(--theme-color)] transition-shadow duration-200" onClick={(e) => {e.stopPropagation() 
                    handleOpen(ele)}} >
                        <div className="aspect-w-1 aspect-h-1 mb-3 md:mb-4 overflow-hidden rounded-lg">
                            {ele.image ? (
                                <img 
                                    src={ele.image} 
                                    alt={ele.name} 
                                    className="w-full h-40 md:h-48 object-cover"
                                />
                            ) : (
                                <img 
                                    src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" 
                                    alt={ele.name} 
                                    className="w-full h-40 md:h-48 object-contain p-4 bg-gray-100"
                                />
                            )}
                        </div>
                        
                        <div className="flex justify-between items-start">
                            <h1 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 line-clamp-1">{ele.name}</h1>
                            <button className="text-xl md:text-2xl font-semibold">⋮</button>
                        </div>
                        
                        <div className="space-y-1 md:space-y-2">
                            <p className="text-[var(--theme-color)] text-sm md:text-base flex items-center gap-1">
                                <LocationIcon size={16} md:size={20} width="1em" /> 
                                <span className="line-clamp-1">{ele.location}</span>
                            </p>
                            <p className="text-gray-600 text-sm md:text-base">{ele.shop} Admin</p>
                            <p className="text-gray-600 text-sm md:text-base truncate">{ele.email}</p>
                            <p className="text-gray-600 text-sm md:text-base truncate">{ele.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}