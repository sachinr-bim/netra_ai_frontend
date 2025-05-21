import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShopAdminAPI,getShopAdminsAPI } from '../../../../../reduxToolkit/slices/shopSlice'

export default function AddAdmin({ isOpen, onClose, shopId }) {
    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.shops)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const handleAdd = async (e) => {
        e.preventDefault()
        
        const adminData = {
            firstname: firstName,
            lastname: lastName,
            email,
            location,
            phone_number: phoneNumber,
            password_hash: password,
            shop_id: shopId // Assuming your API needs shop ID
        }

        console.log('Admin Data:', adminData)

        try {
            await dispatch(createShopAdminAPI(adminData)).unwrap()
            // Reset form on success
            setFirstName("")
            setLastName("")
            setEmail("")
            setLocation("")
            setPhoneNumber("")
            setPassword("")
            onClose()
            dispatch(getShopAdminsAPI(shopId))
        } catch (err) {
            // Error is already handled in Redux slice
            console.error('Failed to create admin:', err)
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

                    <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                           <span className="text-2xl">📷</span> 
                        </div>
                        <button className="mt-2 px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded-md hover:bg-gray-100">
                            Upload new picture
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleAdd}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label htmlFor="firstName" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">First Name</label>  
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Last Name</label>  
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                            </div>
                        </div>
                        
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Location</label>
                            <input 
                                type="text" 
                                id="location" 
                                name='location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phoneNumber" 
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-10 md:h-12 p-2 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div>
                                <div className='flex gap-4'>
                                <input 
                                    type="checkbox" 
                                    className="md:h-12 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                                <label htmlFor="password" className="block text-md font-semibold ">Allow Admin To Modify Camera </label>
                            </div>
                            <div className='flex gap-4' >
                                <input 
                                    type="checkbox" 
                                    className="md:h-12 border border-gray-300 rounded-lg text-sm md:text-base" 
                                    required
                                />
                                <label htmlFor="password" className="block text-md font-semibold">Allow Admin To Modify Edge Device </label>
                            </div>
                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                            <button 
                                type="button" 
                                className="px-3 py-1 md:px-4 md:py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-lg hover:bg-[var(--theme-color)] hover:text-white transition-colors text-sm md:text-base"
                                onClick={onClose}
                                disabled={status === 'loading'}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className={`px-3 py-1 md:px-4 md:py-2 bg-gray-200 text-black rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors text-sm md:text-base ${
                                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}