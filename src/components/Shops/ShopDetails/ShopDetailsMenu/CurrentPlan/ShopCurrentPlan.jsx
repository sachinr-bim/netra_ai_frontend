import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlanActionList from './PlanActionList';
import { fetchSubscriptionByTenantId } from '../../../../../reduxToolkit/slices/subscriptionSlice';

export default function ShopCurrentPlan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);
  
  // Get tenantId from wherever it's stored in your app (might need to adjust this)
  const tenantId = useSelector(state => state.auth.user?.tenantId);
  
  const { 
    currentSubscription, 
    loading, 
    error 
  } = useSelector(state => state.subscription);

  useEffect(() => {
    if (tenantId) {
      dispatch(fetchSubscriptionByTenantId(tenantId));
    }
  }, [tenantId, dispatch]);

  const handleActionClick = (index, event) => {
    event.stopPropagation();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleMenuAction = (action) => {
    setActiveMenu(null);
    navigate('/subscription', { state: { action } });
  };

  const handleClickOutside = () => {
    setActiveMenu(null);
  };

  if (loading) {
    return <div className="md:w-3/4 p-8">Loading subscription data...</div>;
  }

  if (error) {
    return <div className="md:w-3/4 p-8">Error: {error}</div>;
  }

  return (
    <div className="md:w-3/4 p-8" onClick={handleClickOutside}>
      <h1 className="text-2xl font-semibold mb-4 p-6">Current Subscription</h1>
      <div className="overflow-x-auto">
        {currentSubscription ? (
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
              <tr className="hover:bg-[#fff5e7] relative">
                <td className="p-4">{currentSubscription.plan?.name || 'N/A'}</td>
                <td className="p-4">{currentSubscription.dueDate || 'N/A'}</td>
                <td className="p-4">{currentSubscription.renewalDate || 'N/A'}</td>
                <td className="p-4">${currentSubscription.amount || '0.00'}</td>
                <td className="p-4">
                  <div className="relative">
                    <button 
                      className="text-2xl font-semibold text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={(e) => handleActionClick(0, e)}
                    >  ⋮ </button>
                    {activeMenu === 0 && (
                      <PlanActionList 
                        currentPlan={currentSubscription} 
                        handleMenuAction={handleMenuAction} 
                      />
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h1 className="text-md font-semibold mb-4 p-6">Not Subscribed</h1>
        )}
      </div>
    </div>
  );
}