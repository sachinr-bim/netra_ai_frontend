import React, { useState } from "react";

// Components
import SettingsSidebar from "./SettingsSidebar";
import AccountSettings from "./AccountSettings";
import Password from "./Password";
import Notifications from "./Notifications";
import SettingsSubscription from "./SettingsSubscription";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('accountSettings');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'accountSettings':
        return <AccountSettings />;
      case 'password':
        return <Password />;
      case 'notifications':
        return <Notifications />;
      case 'subscription':
        return <SettingsSubscription />;
      case 'deleteAccount':
        return <DeleteAccount setActiveTab={setActiveTab} />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="bg-white rounded-2xl flex flex-col lg:flex-row h-240">
      {/* Mobile Toggle Button (only visible on small screens) */}
      <button 
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden p-3 flex items-center justify-between border-b"
      >
        <span className="font-medium">
          {activeTab === 'accountSettings' && 'Account Settings'}
          {activeTab === 'password' && 'Password'}
          {activeTab === 'notifications' && 'Notifications'}
          {activeTab === 'subscription' && 'Subscription'}
          {activeTab === 'deleteAccount' && 'Delete Account'}
        </span>
        <svg 
          className={`w-5 h-5 transform ${showMobileSidebar ? 'rotate-90' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div 
        className={`${showMobileSidebar ? 'block' : 'hidden'} lg:block`}
        style={{ minWidth: '250px' }} // Preserve your original sidebar width
      >
        <SettingsSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onSelect={() => setShowMobileSidebar(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}