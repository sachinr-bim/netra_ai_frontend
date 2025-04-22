import React, {useState} from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { editAdmin } from '../../../reduxToolkit/slices/shopSlice'

export default function EditAdmin({isOpen, onClose, id, image, name, location, shop, email}) {

    const dispatch = useDispatch()

    const [adminName, setAdminName] = useState(name)
    const [locationName, setLocationName] = useState(location)
    const [shopName, setShopName] = useState(shop)
    const [emailName, setEmailName] = useState(email)

    const handleEdit = (e) => {
        e.preventDefault()
        const data = {
            id,
            adminName,
            locationName,
            shopName,
            emailName
        }
        console.log(data)
        dispatch(editAdmin(data))
        onClose()
    }
 
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="bg-white rounded-lg w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Admin Profile</h2>
            </div>

            <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                   { image ? <img src={image} alt={name} /> : <span className="text-2xl">📷</span> } 
                </div>
                <button className="mt-2 px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded-md hover:bg-gray-100">
                    Upload new picture
                </button>
                <button className="mt-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-200 text-black rounded-full hover:bg-[var(--theme-color)] hover:text-white transition-colors duration-200 whitespace-nowrap">
                    Delete
                </button>
            </div>

            <form onSubmit={handleEdit}>
                <div className="mb-3">
                    <label htmlFor="shopName" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Admin Name</label>  
                    <input 
                        type="text" 
                        id="shopName" 
                        name="shopName"
                        value={adminName}
                        onChange = {(e) => setAdminName(e.target.value)}
                        className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="location" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Location</label>
                    <input 
                        type="text" 
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="cameras" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Shop Name</label>
                    <input 
                        type="text" 
                        id="shopName" 
                        name="shopName"  
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={emailName}
                        onChange={(e) => setEmailName(e.target.value)}
                        className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button type="button" className="px-3 py-1 md:px-4 md:py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-lg hover:bg-[var(--theme-color)] hover:text-white transition-colors text-sm md:text-base"
                    onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="px-3 py-1 md:px-4 md:py-2 bg-gray-200 text-black rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors text-sm md:text-base" >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  );
}
