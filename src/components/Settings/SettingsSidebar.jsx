export default function SettingsSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'accountSettings', name: "Account Settings" },
    { id: 'password', name: "Password" },
    { id: 'notifications', name: "Notifications & Alerts" },
    { id: 'subscription', name: "Subscription" },
    { id: 'deleteAccount', name: "Suspend Account" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white rounded-t-lg md:rounded-s-3xl md:rounded-r-none p-4 md:p-6 md:border-r">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 lg:mb-8">
        Settings
      </h2>
      <nav className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`whitespace-nowrap text-left p-2 md:p-3 rounded-lg text-sm md:text-base ${
              activeTab === item.id 
                ? "bg-[var(--theme-color)] text-white" 
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}