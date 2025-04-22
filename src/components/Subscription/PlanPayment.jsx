import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PlanPayment({ isOpen, onClose, plan, isYearly }){
  const [customerName, setCustomerName] = useState("Mr. Kinley");
  const [shopName, setShopName] = useState("Sailor shop");
  const [billingAddress, setBillingAddress] = useState("Newyork street");
  const [devices, setDevices] = useState(1);

  if (!isOpen || !plan) return null;

  // Calculate the total amount based on yearly/monthly and number of devices
  const totalAmount = isYearly ? (plan.price * 12 * 0.7 * devices) : (plan.price * devices);
  const perDevicePrice = isYearly ? (plan.price * 0.7) : plan.price;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[700px] p-8 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6">Get {plan.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">Customer Name</label>
            <input
              className="border rounded w-full p-2 mb-4"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label className="block text-sm mb-2">Shop Name</label>
            <input
              className="border rounded w-full p-2 mb-4"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />

            <label className="block text-sm mb-2">Billing Address</label>
            <input
              className="border rounded w-full p-2 mb-4"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />

            <label className="block text-sm mb-2">Payment Method</label>
            <div className="flex gap-4">
              <button className="border rounded px-4 py-2 flex items-center gap-2">
                <span role="img">💳</span> CARD
              </button>
              <button className="border rounded px-4 py-2 flex items-center gap-2">
                <span role="img">🅿️</span> PayPal
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4">
            <h3 className="font-semibold mb-4">Plan info</h3>
            <ul className="text-sm mb-4 space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
            <div className="mb-2 flex gap-2">
              <button 
                className={`px-3 py-1 border rounded text-sm ${!isYearly ? 'bg-cyan-500 text-white' : ''}`}
              >
                Monthly
              </button>
              <button 
                className={`px-3 py-1 border rounded text-sm ${isYearly ? 'bg-cyan-500 text-white' : ''}`}
              >
                Yearly
              </button>
            </div>

            <div className="flex items-center justify-between my-2">
              <span className="text-sm">Number of devices</span>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 border rounded"
                  onClick={() => setDevices((d) => Math.max(1, d - 1))}
                >
                  -
                </button>
                <span>{devices}</span>
                <button
                  className="px-2 border rounded"
                  onClick={() => setDevices((d) => d + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-sm my-2">Price per device: <strong>${perDevicePrice.toFixed(2)}/{isYearly ? 'year' : 'month'}</strong></p>
            <p className="text-sm my-2">Total devices: <strong>{devices}</strong></p>
            <p className="text-sm my-2">Charged Today: <strong>${totalAmount.toFixed(2)}</strong></p>

            <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: totalAmount.toFixed(2),
                        currency_code: "USD",
                      },
                    }],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert(`Transaction completed by ${details.payer.name.given_name}`);
                    onClose();
                  });
                }}
              />
            </PayPalScriptProvider>

            <p className="text-xs mt-4">
              By clicking "Confirm and pay" you agree to our Terms of use. 
              {isYearly && " Automatic annual renewal."} Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};