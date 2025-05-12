import React from 'react'

export default function PlanActionList({currentPlan,handleMenuAction}) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <div className="py-1">
          {currentPlan.plan === 'Premium' || currentPlan.plan === 'Enterprise' ? (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleMenuAction('downgrade')}
            >
              Downgrade Plan
            </button>
          ) : (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleMenuAction('upgrade')}
            >
              Upgrade Plan
            </button>
          )}
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleMenuAction('manage')}
          >
            Manage Subscription
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => handleMenuAction('cancel')}
          >
            Cancel Subscription
          </button>
        </div>
        </div>
  )
}
