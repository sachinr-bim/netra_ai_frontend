import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { addShop } from "../../../reduxToolkit/slices/shopSlice";

export default function AddShop({ isOpen, onClose }) {
  
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [location,setLocation] = useState("")
    const [shopOwner,setShopOwner] = useState("")
    const [adminCount,setAdminCount] = useState("")
    const [cameras,setCameras] = useState("")

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === 'shopName'){
            setName(value)
        }else if(name === 'location'){
            setLocation(value)
        }else if(name === 'shopOwner'){
            setShopOwner(value)
        }else if(name === 'adminCount'){
            setAdminCount(value)
        }else if(name === 'cameras'){
            setCameras(value)
        }

    }

    const handleAdd = (e) => {

        e.preventDefault()

        const data = {
            name,
            location,
            shopOwner,
            adminCount,
            cameras
        }

        console.log('Data:',data)
        dispatch(addShop(data))
        onClose()
    }

  
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="bg-white rounded-lg w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Add Shop Profile</h2>
            </div>

            <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl">📷</span>
                </div>
                <button className="mt-2 px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded-md hover:bg-gray-100">
                    Upload new picture
                </button>
                <button className="mt-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded-full hover:bg-gray-600">
                    Delete
                </button>
            </div>

            <form onSubmit={handleAdd}>
                <div className="mb-3">
                    <label htmlFor="shopName" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Shop Name</label>  
                    <input 
                        type="text" 
                        id="shopName" 
                        name="shopName" 
                        value={name} 
                        placeholder="Shop Name" 
                        className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="location" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        value={location} 
                        placeholder="Location" 
                        className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="cameras" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Total Camera</label>
                    <input 
                        type="number" 
                        id="cameras" 
                        name="cameras" 
                        value={cameras} 
                        placeholder="Total Camera" 
                        className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                        onChange={handleChange} 
                        min="0"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="adminCount" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Total Admin</label>
                    <input 
                        type="number" 
                        id="adminCount" 
                        name="adminCount" 
                        value={adminCount} 
                        placeholder="Total Admin" 
                        className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                        onChange={handleChange} 
                        min="0"
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button 
                        type="button" 
                        className="px-3 py-1 md:px-4 md:py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-lg hover:bg-[var(--theme-color)] hover:text-white transition-colors text-sm md:text-base"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-3 py-1 md:px-4 md:py-2 bg-[var(--theme-color)] text-white rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors text-sm md:text-base"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  );
}
