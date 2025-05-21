import { useState,useEffect } from "react";

// Redux
import { useSelector,useDispatch } from "react-redux";
import { createSubscription, resetSubscriptionState } from "../../reduxToolkit/slices/subscriptionSlice"
import { getCurrentUser } from "../../reduxToolkit/slices/authSlice";

// Packages and Libraries
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export default function PlanPayment({ isOpen, onClose, plan, isYearly }) {

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCurrentUser());
    }, [dispatch]);

  const [customerName, setCustomerName] = useState("Mr. Kinley");
  const [shopName, setShopName] = useState("Sailor shop");
  const [billingAddress, setBillingAddress] = useState("Newyork street");
  const [devices, setDevices] = useState(1);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  if (!isOpen || !plan) return null;

  // Calculate the total amount based on yearly/monthly and number of devices
  const totalAmount = isYearly 
    ? (plan.price * 12 * 0.7 * devices) 
    : (plan.price * devices);
  const perDevicePrice = isYearly 
    ? (plan.price * 0.7) 
    : plan.price;

  const handlePaymentSuccess = async (transactionId) => {
  try {
    // Prepare subscription data for API
    const subscriptionData = {
      amount: totalAmount,
      payment_method: "Paypal",
      payment_status: "Success",
      status: "Active",
      plan_id: plan.id,
      tenant_id: userInfo.tenant_id,
      transaction_id: transactionId,

    };

    console.log("Subscription Data", subscriptionData)

    // First verify the payment with your backend
   await dispatch(createSubscription(subscriptionData)).unwrap()

    // Only show success if both PayPal and your API succeeded
    Swal.fire({
      title: "Payment Successful!",
      text: `Your ${plan.name} plan has been activated.`,
      icon: "success"
    });
    
    setTimeout(() => {
      onClose();
      dispatch(resetSubscriptionState());
      navigate('/');
    }, 2000);
  } catch{
    Swal.fire({
      title: "Payment Verification Failed",
      text: "Payment was processed but we couldn't activate your subscription. Please contact support with your PayPal transaction ID.",
      icon: "error"
    });
  }
};

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] p-8 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6">Get {plan.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Customer Name</label>
            <input
              className="border border-[#CACACA] rounded-lg w-full p-4 mb-4"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label className="block text-lg font-semibold mb-2">Shop Name</label>
            <input
              className="border border-[#CACACA] rounded-lg w-full p-4 mb-4"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />

            <label className="block text-lg font-semibold mb-2">Billing Address</label>
            <input
              className="border border-[#CACACA] rounded-lg w-full p-4 mb-4"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Plan info</h3>
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-md font-semibold mb-2">With standard you get</h3>
              <ul className="text-sm mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="bg-white p-2 rounded-lg mb-4 flex gap-2">
                <button 
                  className={`px-3 py-1 rounded text-sm ${!isYearly ? 'bg-cyan-500 text-white' : ''}`}
                >
                  Monthly
                </button>
                <button 
                  className={`px-3 py-1 rounded text-sm ${isYearly ? 'bg-cyan-500 text-white' : ''}`}
                >
                  Yearly
                </button>
              </div>

              <div className="flex items-center justify-between my-3">
                <span className="text-sm font-semibold">Number of devices</span>
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

              <p className="text-sm font-semibold my-2">Price per device: <strong>${perDevicePrice.toFixed(2)}/{isYearly ? 'year' : 'month'}</strong></p>
              <p className="text-sm font-semibold my-2">Total devices: <strong>{devices}</strong></p>

              {!showPromoInput ? (
                <div 
                  className="flex items-center text-[var(--theme-color)] p-2 border-y-2 border-[#CACACA] cursor-pointer mb-4"
                  onClick={() => setShowPromoInput(true)}
                >
                  <span className="mr-2 text-sm font-semibold">Add a promo code</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="border border-gray-300 rounded-lg w-full p-2 pr-8"
                    />
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setPromoCode("");
                        setShowPromoInput(false);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                  <button 
                    className="ml-2 bg-[var(--theme-color)] text-white hover:bg-white hover:text-[var(--theme-color)] hover:border border-[var(--theme-color)] px-4 py-2 rounded-lg"
                    onClick={() => {
                      // Handle promo code application here
                      console.log("Applying promo code:", promoCode);
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}

              <p className="text-sm font-semibold my-2">Charged Today: <strong>${totalAmount.toFixed(2)}</strong></p>

              <div className="mb-4">
                <PayPalScriptProvider 
                  options={{ 
                    "client-id": "test", // Using special test value
                    components: "buttons",
                    currency: "USD",
                    intent: "capture"
                  }}
                >
                  <PayPalButtons
                    style={{ 
                      layout: "horizontal",
                      color: "gold",
                      shape: "pill",
                      label: "paypal"
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: totalAmount.toFixed(2),
                            currency_code: "USD",
                            breakdown: {
                              item_total: {
                                value: totalAmount.toFixed(2),
                                currency_code: "USD"
                              }
                            }
                          },
                          items: [{
                            name: `${plan.name} Plan (${isYearly ? 'Yearly' : 'Monthly'})`,
                            description: `${devices} device(s)`,
                            quantity: "1",
                            unit_amount: {
                              value: totalAmount.toFixed(2),
                              currency_code: "USD"
                            }
                          }]
                        }],
                        application_context: {
                          shipping_preference: "NO_SHIPPING"
                        }
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePaymentSuccess(details.id);
                        console.log("Payment details:", details);
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      Swal.fire({
                        title: "Payment Error",
                        text: "There was an error processing your PayPal payment. Please try again.",
                        icon: "error"
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>

              <p className="text-xs mt-4">
                By clicking "Confirm and pay" you agree to our Terms of use. 
                {isYearly && " Automatic annual renewal."} Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};