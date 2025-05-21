import React from 'react'

// Redux
import { useSelector } from 'react-redux';

export default function SettingsSubscription() {

    const { payments } = useSelector(state => state.payments);

  return (
    <div className="flex-1 p-10">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Subscription</h1>
          <p className='text-gray-500 mb-4' >Pro Plan for a better result</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#fff5e7]">
                  {["Invoice ID", "Payment Date", "Amount", "Method", "Action"].map(header => (
                    <th key={header} className="text-left p-3 md:p-4 text-sm md:text-base whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={index} className="hover:bg-[#fff5e7]/50 border-t border-gray-100">
                      <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.transaction_id}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.createdAt}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.amount}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.payment_method}</td>
                      <td className="p-3 md:p-4 text-gray-500 cursor-pointer text-xl">⋮</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No payments found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}
