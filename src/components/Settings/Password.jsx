export default function Password(){

    return(
        <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-1">Change Password</h2>
        <p className="text-gray-500 mb-6">Manage your password</p>


        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-gray-600 font-bold">Current Password</span>
            <input
              type="text"
              name="name"
              className="w-full h-12 border-gray-600 mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">New Password</span>
            <input
              type="text"
              name="location"
              className="w-full h-12 border-gray-600 mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-600 font-bold">Retype New Password</span>
            <input
              type="email"
              name="email"
              className="w-full h-12 border-gray-600 mt-1 p-2 border rounded-2xl"
            />
          </label>

          <p className="text-gray-500 text-sm">
            Your password must be atleast 6 characters and should include a combination of numbers, letters and special characters (!$@%).
          </p>
            <br />
          <p className="text-[var(--theme-color)] text-sm">
            Forgotten your password?
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-15 py-2 bg-[var(--theme-color)] text-white rounded-lg hover:bg-gray-500">
            Change
          </button>
        </div>
      </main>
    )
}