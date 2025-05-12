import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShopAdminAPI } from '../../../reduxToolkit/slices/shopSlice'

export default function EditAdmin({ isOpen, onClose, id, image, name, location, shop, email, phone }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Form state
    const [formData, setFormData] = useState({
        name: name || '',
        location: location || '',
        shop: shop || '',
        email: email || '',
        phone: phone || ''
    })

    // Update form data when props change
    useEffect(() => {
        setFormData({
            name: name || '',
            location: location || '',
            shop: shop || '',
            email: email || '',
            phone: phone || ''
        })
    }, [name, location, shop, email, phone])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Prepare the data for API (adjust field names as needed)
            const adminData = {
                name: formData.name,
                location: formData.location,
                shop: formData.shop,
                email: formData.email,
                phone: formData.phone
                // Add other fields as required by your API
            }

            // Dispatch the API call
            const resultAction = await dispatch(updateShopAdminAPI({
                id,
                adminData
            }))

            if (updateShopAdminAPI.fulfilled.match(resultAction)) {
                onClose() // Close the modal on success
            } else if (updateShopAdminAPI.rejected.match(resultAction)) {
                setError(resultAction.payload || "Failed to update admin")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 md:p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Admin Profile</h2>
                    </div>

                    {/* Error message display */}
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> 
                                   : <span className="text-2xl">📷</span>}
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
                            <label htmlFor="name" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Admin Name</label>  
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="location" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Location</label>
                            <input 
                                type="text" 
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="shop" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Shop Name</label>
                            <input 
                                type="text" 
                                id="shop"
                                name="shop"
                                value={formData.shop}
                                onChange={handleChange}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Contact No.</label>
                            <input 
                                type="tel" 
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                            <button 
                                type="button" 
                                className="px-3 py-1 md:px-4 md:py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-lg hover:bg-[var(--theme-color)] hover:text-white transition-colors text-sm md:text-base"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-3 py-1 md:px-4 md:py-2 bg-gray-200 text-black rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors text-sm md:text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}