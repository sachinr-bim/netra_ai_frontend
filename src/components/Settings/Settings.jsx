import React, { useState } from "react";

// Components
import SettingsSidebar from "./SettingsSidebar";
import AccountSettings from "./AccountSettings";
import Password from "./Password";
import Notifications from "./Notifications";
import SettingsSubscription from "./SettingsSubscription";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {

  const [activeTab, setActiveTab] = useState('accountSettings');


  const renderContent = () => {
    switch (activeTab) {
      case 'accountSettings':
        return <AccountSettings />;
      case 'password':
        return <Password />;
      case 'notifications':
        return <Notifications /> 
      case 'subscription':
        return <SettingsSubscription />
      case 'deleteAccount':
        return <DeleteAccount setActiveTab={setActiveTab} />    
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="flex h-240 bg-white rounded-2xl">
      {/* Sidebar */}
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}
