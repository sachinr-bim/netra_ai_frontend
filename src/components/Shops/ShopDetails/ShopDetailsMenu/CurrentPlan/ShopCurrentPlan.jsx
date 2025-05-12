import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Packages and Libraries
import { useNavigate } from 'react-router-dom';

// Components
import PlanActionList from './PlanActionList';

export default function ShopCurrentPlan() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const upcomingPayments = useSelector(state => state.subscription.upcomingPayments);

  // Get the first payment as the current plan (you might want to adjust this logic)
  const currentPlan = upcomingPayments.length > 0 ? upcomingPayments[0] : null;

  const handleActionClick = (index, event) => {
    event.stopPropagation();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleMenuAction = (action) => {
    setActiveMenu(null);
    navigate('/subscription', { state: { action } });
  };

  // Close menu when clicking outside
  const handleClickOutside = () => {
    setActiveMenu(null);
  };

  if (!currentPlan) {
    return <div className="md:w-3/4 p-8">Loading or no subscription found...</div>;
  }

  return (
    <div className="md:w-3/4 p-8" onClick={handleClickOutside}>
      <h1 className="text-2xl font-semibold mb-4 p-6">Current Subscription</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#fff5e7]">
            <tr>
              <th className="text-left p-4">Subscription Plan</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Renewal Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={currentPlan.id} className="hover:bg-[#fff5e7] relative">
              <td className="p-4">{currentPlan.plan}</td>
              <td className="p-4">{currentPlan.dueDate}</td>
              <td className="p-4">{currentPlan.renewalDate}</td>
              <td className="p-4">{currentPlan.amount}</td>
              <td className="p-4">
                <div className="relative">
                  <button 
                    className="text-2xl font-semibold text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={(e) => handleActionClick(0, e)}
                  >  ⋮ </button>
                  { activeMenu === 0 && ( <PlanActionList currentPlan={currentPlan} handleMenuAction={handleMenuAction} /> )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}