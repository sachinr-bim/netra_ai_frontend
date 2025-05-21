import { useState,useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchPlans } from "../../reduxToolkit/slices/subscriptionSlice";

// Components
import PlanCards from "./PlanCards";

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(false);

   const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>Error: {error}</div>;

  // Transform API data to match the expected format
  const transformedPlans = plans.map(plan => ({
    id: plan.plan_id,
    name: plan.plan_name,
    price: isYearly ? parseFloat(plan.price) * 12 * 0.7 : parseFloat(plan.price),
    features: [
      `Up to ${plan.camera_limit} cameras`,
      `For ${plan.shop_limit} shop`,
      plan.description,
      ...(plan.features ? Object.entries(plan.features).map(([key, value]) => `${key}: ${value}`) : [])
    ]
  }));

  return (
    <div className="flex bg-white min-h-screen flex-col items-center py-35  px-4 md:px-20">
      <h2 className="text-[var(--theme-color)] text-md mt-10">Pricing Plan</h2>
      <h1 className="text-3xl font-bold mt-2">
        <span className="text-[var(--theme-color)]">Netra3</span> Plans For You
      </h1>

      <PlanCards plans={transformedPlans} isYearly={isYearly} setIsYearly={setIsYearly} />
    </div>
  );
};

