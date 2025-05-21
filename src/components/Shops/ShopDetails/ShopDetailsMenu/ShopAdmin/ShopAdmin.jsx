import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteShopAdminAPI, getShopAdminsAPI } from "../../../../../reduxToolkit/slices/shopSlice";
import { getCurrentUser } from "../../../../../reduxToolkit/slices/authSlice";
import Swal from "sweetalert2";
import { LocationIcon } from "../../../../../assets/icons/LocationIcon";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

export default function ShopAdmin() {
    const dispatch = useDispatch();
    const { admins, adminsStatus, adminsError } = useSelector((state) => state.shops);
    const { userInfo } = useSelector((state) => state.auth);
    
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRefs = useRef([]);

    const tenantId = userInfo?.tenant_id;

    useEffect(() => {
        if (tenantId) {
            dispatch(getShopAdminsAPI(tenantId));
        }
        dispatch(getCurrentUser());
    }, [dispatch, tenantId]);

    const handleAddOpen = () => setIsAddOpen(!isAddOpen);

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setOpenMenuId(null);
    };

    const handleClose = () => setEditingAdmin(null);

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "px-4 py-2 bg-[var(--theme-color)] text-white rounded-sm m-2 hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)]",
                cancelButton: "px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
            },
            buttonsStyling: false
        });
        
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteShopAdminAPI(id))
                    .unwrap()
                    .then(() => {
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Admin has been deleted.",
                            icon: "success"
                        });
                        dispatch(getShopAdminsAPI(tenantId)); // Refresh the list
                    })
                    .catch((error) => {
                        console.error("Failed to delete admin:", error);
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: error.message || "Failed to delete admin",
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Admin deletion cancelled",
                    icon: "error"
                });
            }
        });
        
        setOpenMenuId(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenuId !== null && 
                menuRefs.current[openMenuId] && 
                !menuRefs.current[openMenuId].contains(event.target)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenuId]);

    return (
        <div className="bg-white">
            {/* Add Admin Modal */}
            <AddAdmin isOpen={isAddOpen} onClose={handleAddOpen} tenantId={tenantId} />
            
            {/* Edit Admin Modal */}
            {editingAdmin && (
                <EditAdmin 
                    isOpen={!!editingAdmin} 
                    onClose={handleClose} 
                    adminData={editingAdmin}
                    tenantId={tenantId}
                />
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-xl mb-4 md:mb-6 gap-3 md:gap-4">
                <h1 className="text-xl md:text-2xl font-bold">Shop Admins</h1>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 md:gap-3">
                    <button 
                        className="bg-[var(--theme-color)] hover:bg-white text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors duration-200 whitespace-nowrap text-sm md:text-base" 
                        onClick={handleAddOpen}
                    >
                        Create
                    </button>
                </div>
            </div>

            {/* Loading and Error States */}
            {adminsStatus === 'loading' && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
                </div>
            )}

            {adminsStatus === 'failed' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{adminsError?.message || 'Failed to load admins'}</span>
                </div>
            )}

            {adminsStatus === 'succeeded' && admins.length === 0 && (
                <div className="text-center py-8">
                    <p>No admins found for this shop</p>
                </div>
            )}

            {/* Admins Grid */}
            {adminsStatus === 'succeeded' && admins.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {admins.map((admin, index) => (
                        <div key={admin.user_id} className="bg-white rounded-xl p-3 md:p-4 relative">
                            <div className="aspect-w-1 aspect-h-1 mb-3 md:mb-4 overflow-hidden rounded-lg">
                                {admin.profile_picture ? (
                                    <img 
                                        src={admin.profile_picture} 
                                        alt={`${admin.firstname} ${admin.lastname}`} 
                                        className="w-full h-20 md:h-28 object-cover"
                                    />
                                ) : (
                                    <img 
                                        src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" 
                                        alt={`${admin.firstname} ${admin.lastname}`} 
                                        className="w-full h-24 md:h-30 object-contain p-4 bg-white"
                                    />
                                )}
                            </div>
                            
                            <div className="flex justify-between items-start">
                                <h1 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 line-clamp-1">
                                    {admin.firstname} {admin.lastname}
                                </h1>
                                <div className="relative" ref={el => menuRefs.current[index] = el}>
                                    <button 
                                        className="text-xl md:text-2xl font-semibold hover:bg-gray-100 p-6 rounded-full w-8 h-8 flex items-center justify-center"
                                        onClick={(e) => toggleMenu(index, e)}
                                    >
                                        ⋮
                                    </button>
                                    
                                    {openMenuId === index && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                            <div className="py-1">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(admin);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    onClick={(e) => handleDelete(admin.user_id, e)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-[var(--theme-color)] text-sm md:text-base flex items-center gap-1">
                                    <LocationIcon size={16} md:size={20} width="1em" /> 
                                    <span className="line-clamp-1">{admin.location || 'Location not specified'}</span>
                                </p>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {admin.role_id === 2 ? 'Main Admin' : 'Shop Admin'}
                                </p>
                                <p className="text-gray-600 text-sm md:text-base truncate">
                                    {admin.email}
                                </p>
                                <p className="text-gray-600 text-sm md:text-base truncate">
                                    {admin.phone_number || 'Phone not specified'}
                                </p>
                                <p className={`text-sm md:text-base ${
                                    admin.status === 'Active' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    Status: {admin.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}