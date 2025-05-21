import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShopAdminAPI,getShopAdminsAPI } from '../../../../../reduxToolkit/slices/shopSlice'

export default function EditAdmin({ isOpen, onClose, adminData, shopId }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Form state - using the correct fields from your API
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        phone_number: '',
        // Add other fields as needed by your API
    })

    // Initialize form data when component mounts or adminData changes
    useEffect(() => {
        if (adminData) {
            setFormData({
                firstname: adminData.firstname || '',
                lastname: adminData.lastname || '',
                email: adminData.email || '',
                location: adminData.location || '',
                phone_number: adminData.phone_number || '',
                // Initialize other fields here
            })
        }
    }, [adminData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Prepare the data in the format your API expects
            const updateData = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                location: formData.location,
                phone_number: formData.phone_number,
                // Include other fields your API expects
            }

            const resultAction = await dispatch(updateShopAdminAPI({
                id: adminData.user_id, // Using user_id as the identifier
                adminData: updateData
            }))

            if (updateShopAdminAPI.fulfilled.match(resultAction)) {
                onClose() // Close modal on success
                dispatch(getShopAdminsAPI(shopId));
            } else {
                throw new Error(resultAction.payload || "Update failed")
            }
        } catch (err) {
            setError(err.message)
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
                        <h2 className="text-xl md:text-2xl font-semibold">Edit Admin</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            X
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                           <span className="text-2xl">📷</span> 
                        </div>
                        <button className="mt-2 px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded-md hover:bg-gray-100">
                            Edit picture
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div className="mb-4">
                            <label htmlFor="firstname" className="block text-sm font-medium mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-4">
                            <label htmlFor="lastname" className="block text-sm font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className='flex gap-4'>
                                <input 
                                    type="checkbox" 
                                    className="md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                                <label htmlFor="password" className="block text-md font-semibold mb-1">Allow Admin To Add or Modify Camera </label>
                            </div>
                            <div className='flex gap-4' >
                                <input 
                                    type="checkbox" 
                                    className="md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                                <label htmlFor="password" className="block text-md font-semibold mb-1">Allow Admin To Add or Modify Edge Device </label>
                            </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[var(--theme-color)] text-white rounded hover:bg-white hover:text-[var(--theme-color)] border"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}