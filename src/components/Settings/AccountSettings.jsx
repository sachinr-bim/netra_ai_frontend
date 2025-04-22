import { useState } from "react";

export default function AccountSettings(){

    const [formData, setFormData] = useState({
        name: "Mr. Kinley",
        location: "Newyork, Khulna",
        email: "kinley65@gmail.com",
        bio: "Shop Owner Of Newyork",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    return(
        <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-1">Account Settings</h2>
        <p className="text-gray-500 mb-6">Set up your netra3 presence</p>

        {/* Profile Picture */}
        <div className="flex items-center space-x-6">
          <img
            src="https://images2.alphacoders.com/156/thumb-1920-156022.jpg"
            alt="Profile"
            className="w-25 h-25 p-2 rounded-full border-2 border-orange-300"
          />
          <div>
            <button className="px-4 py-2 border-1 border-gray-300 rounded-full text-gray-700">
              Upload new picture
            </button>
            <button className="px-6 py-2 ml-2 bg-gray-300 text-gray-700 rounded-full">
              Delete
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-gray-600 font-bold">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">Bio</span>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              rows="3"
            />
          </label>

          <p className="text-gray-500 text-sm">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-[var(--theme-color)] text-white rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
            Save
          </button>
        </div>
      </main>
    )
}