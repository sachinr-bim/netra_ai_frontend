import React, { useState } from 'react';

export default function Alerts() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message received",
      message: "You have 3 unread messages from your team",
      time: "2 mins ago",
      read: false,
      type: "message"
    },
    {
      id: 2,
      title: "Payment processed",
      message: "Your subscription payment was successful",
      time: "1 hour ago",
      read: true,
      type: "payment"
    },
    {
      id: 3,
      title: "System update",
      message: "New features available in your dashboard",
      time: "3 hours ago",
      read: true,
      type: "system"
    },
    {
      id: 4,
      title: "Reminder",
      message: "Your shop analytics report is ready",
      time: "1 day ago",
      read: false,
      type: "reminder"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--theme-color)] p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="ml-2 text-xl font-semibold text-white">Notifications</h2>
        </div>
        {unreadCount > 0 && (
          <span className="bg-white text-[var(--theme-color)] px-2 py-1 rounded-full text-xs font-bold">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications available
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`font-medium ${!notification.read ? 'text-[var(--theme-color)]' : 'text-gray-800'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
                <div className="flex space-x-2 ml-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Mark as read"
                    >
                      Mark as read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    X
                  </button>
                </div>
              </div>
              <div className={`mt-2 h-1 w-8 rounded-full ${
                notification.type === 'message' ? 'bg-blue-500' :
                notification.type === 'payment' ? 'bg-green-500' :
                notification.type === 'system' ? 'bg-purple-500' :
                'bg-yellow-500'
              }`}></div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          className="text-sm text-[var(--theme-color)] hover:text-[var(--theme-color-dark)]"
        >
          Mark all as read
        </button>
        <button 
          onClick={() => setNotifications([])}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}