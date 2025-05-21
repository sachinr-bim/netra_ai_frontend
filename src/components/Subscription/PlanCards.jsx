import {useState} from 'react'

// Components
import PlanPayment from './PlanPayment'

export default function PlanCards({plans,isYearly,setIsYearly}) {

  const [showPayment, setShowPayment] = useState(false);  
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleShowPayment = (plan) => {
    setSelectedPlan({
      ...plan,
      originalPrice: isYearly ? plan.price / 0.7 / 12 : plan.price, // Calculate original monthly price
      duration: isYearly ? 'yearly' : 'monthly'
    });
    setShowPayment(true);
  };


  return (
    <>
       <PlanPayment isOpen={showPayment} onClose={() => setShowPayment(false)} plan={selectedPlan} isYearly={isYearly} />
        <div className="mt-6 flex items-center gap-4 bg-white p-2 rounded-lg">
        <button
          className={`px-4 py-2 rounded-lg ${!isYearly ? "bg-[var(--theme-color)] text-white" : "text-gray-700"}`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${isYearly ? "bg-[var(--theme-color)] text-white" : "text-gray-700"}`}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </button>
        <span className="text-orange-500 text-sm ml-2">Get 30% Off</span>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`${index === 1 ? "border border-[var(--theme-color)] shadow-2xl shadow-theme" : 'shadow-2xl'} rounded-lg p-10 text-center flex flex-col items-center`}
          >
            <h3 className={`text-lg ${index === 1 ? "text-[var(--theme-color)]" : "text-black-200"} font-bold`}>{plan.name}</h3>
            <p className={`text-3xl font-bold ${index === 1 ? "text-[var(--theme-color)]" : "text-black-200"} mt-2`}>
              ${plan.price.toFixed(2)}<span className="text-lg">/{isYearly ? 'Year' : 'Month'}</span>
            </p>
            <ul className="mt-4 text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i} className='m-3'>{feature}</li>
              ))}
            </ul>
            <button 
              className="mt-6 bg-[var(--theme-color)] text-white hover:bg-white hover:border border-[var(--theme-color)] hover:text-[var(--theme-color)] px-6 py-2 rounded-lg" 
              onClick={() => handleShowPayment(plan)}
            >
              Get Started Now
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
