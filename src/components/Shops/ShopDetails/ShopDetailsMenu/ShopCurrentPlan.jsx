import React from 'react'

export default function ShopCurrentPlan() {

  const currentPlan = [
    {
      subscriptionPlan: "Premium",
      lastPayment: "2023-10-15",
      nextPayment: "2023-11-15",
      paymentMethod: "Credit Card ****1234",
      action: "Manage"
    },
    {
      subscriptionPlan: "Basic",
      lastPayment: "2023-10-10",
      nextPayment: "2023-11-10",
      paymentMethod: "PayPal",
      action: "Upgrade"
    },
    {
      subscriptionPlan: "Family",
      lastPayment: "2023-10-05",
      nextPayment: "2023-11-05",
      paymentMethod: "Bank Transfer",
      action: "Cancel"
    },
    {
      subscriptionPlan: "Student",
      lastPayment: "2023-10-01",
      nextPayment: "2023-11-01",
      paymentMethod: "Debit Card ****5678",
      action: "Renew"
    }
  ];

  return (
    <div className="md:w-3/4 p-8">
      <h1 className="text-2xl font-semibold mb-4 p-6">Subscription</h1>
      <div className="overflow-x-auto">
          <table className="w-full border-collapse">
              <thead className="bg-[#fff5e7]">
                  <tr>
                      <th className="text-left p-4">Subscrption Plan</th>
                      <th className="text-left p-4">Last Payment</th>
                      <th className="text-left p-4">Next Payment</th>
                      <th className="text-left p-4">Payment Method</th>
                      <th className="text-left p-4">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {currentPlan.map((ele, index) => (
                      <tr key={index} className="hover:bg-[#fff5e7]">
                          <td className="p-4">{ele.subscriptionPlan}</td>
                          <td className="p-4">{ele.lastPayment}</td>
                          <td className="p-4">{ele.nextPayment}</td>
                          <td className="p-4">{ele.paymentMethod}</td>
                          <td className="p-4 text-2xl font-semibold text-gray-500 cursor-pointer">⋮</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}
