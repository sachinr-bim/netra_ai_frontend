import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, updateTenant } from "../../reduxToolkit/slices/authSlice";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { userInfo, loading, error, success } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current user data when component mounts
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Update form data when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstname: userInfo.firstname || "",
        lastname: userInfo.lastname || "",
        location: userInfo.location || "",
        email: userInfo.email || "",
        bio: userInfo.bio || "Shop Owner",
      });
    }
  }, [userInfo]);

  // Handle success message
  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully!");
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTenant({
        firstname: formData.firstname,
        lastname: formData.lastname,
        location: formData.location,
        bio: formData.bio,
        // Don't include email as it's likely not editable
      })).unwrap();
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading && !userInfo) {
    return (
      <main className="flex-1 p-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-10">
      <h2 className="text-2xl font-semibold mb-1">Account Settings</h2>
      <p className="text-gray-500 mb-6">Set up your netra3 presence</p>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <img
          src={userInfo?.profile_picture || "https://images2.alphacoders.com/156/thumb-1920-156022.jpg"}
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
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-600 font-bold">First Name</span>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              disabled={!isEditing}
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">Last Name</span>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              disabled={!isEditing}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-600 font-bold">Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            disabled={!isEditing}
          />
        </label>

        <label className="block">
          <span className="text-gray-600 font-bold">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
            disabled
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
            disabled={!isEditing}
          />
        </label>

        <p className="text-gray-500 text-sm">
          Brief description for your profile. URLs are hyperlinked.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form to original values
                  if (userInfo) {
                    setFormData({
                      firstname: userInfo.firstname || "",
                      lastname: userInfo.lastname || "",
                      location: userInfo.location || "",
                      email: userInfo.email || "",
                      bio: userInfo.bio || "Shop Owner",
                    });
                  }
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--theme-color)] text-white rounded-md hover:bg-[var(--theme-color-dark)]"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[var(--theme-color)] text-white rounded-md hover:bg-[var(--theme-color-dark)]"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </main>
  );
}