import React, { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    netraCommunication: false,
    anomalyAlerts: false,
    loginAlerts: false,
    accountActivity: false,
    draftees: false,
  });

  const toggleAll = () => {
    const areAllChecked = Object.values(notifications).every(Boolean);
    const updatedState = Object.keys(notifications).reduce((acc, key) => {
      acc[key] = !areAllChecked;
      return acc;
    }, {});
    setNotifications(updatedState);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Notification & Alerts</h2>
        <button className="text-black font-medium" onClick={toggleAll}>
          Toggle All
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Get notified of activity at Netra3
      </p>

        <hr />
        
      <div className="space-y-4 mt-4">
        <div>
          <p className="text-gray-700 font-medium">Send me:</p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="netraCommunication"
              checked={notifications.netraCommunication}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Netra3 Communication</span>
          </label>
        </div>

        <div>
          <p className="text-gray-700 font-medium">Send me alerts</p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="anomalyAlerts"
              checked={notifications.anomalyAlerts}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Anomaly Alerts</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="loginAlerts"
              checked={notifications.loginAlerts}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Login Alerts</span>
          </label>
        </div>

        <div>
          <p className="text-gray-700 font-medium">
            Get Netra3 news, announcements, and product updates
          </p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="accountActivity"
              checked={notifications.accountActivity}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Account Activity</span>
          </label>
        </div>

        <div>
          <p className="text-gray-700 font-medium">
            Get important notifications about you or activity you’ve missed
          </p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="draftees"
              checked={notifications.draftees}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Draftees</span>
          </label>
        </div>
      </div>

       <div className="flex justify-end">
       <button className="w-60 mt-6 bg-[var(--theme-color)] text-white py-2 rounded-lg hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition duration-200 ease-in-out">
        Update
      </button>
        </div> 
    </div>
  );
}
