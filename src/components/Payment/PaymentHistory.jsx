import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayments } from "../../reduxToolkit/slices/paymentSlice";

// Components
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import PaymentSearch from "./PaymentSearch";


export default function PaymentHistory() {
  const dispatch = useDispatch();

  const { payments, status, error } = useSelector( (state) => state.payments)
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });

  console.log("Payments:", payments)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPayments());
    }
  }, [status, dispatch]);

  const hasActiveFilters = searchTerm || dateFilter.startDate || dateFilter.endDate;

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = !searchTerm || 
      [payment.id, payment.plan, payment.method, payment.amount.toString()].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesDateRange = (
      (!dateFilter.startDate || new Date(payment.createdAt) >= new Date(dateFilter.startDate)) &&
      (!dateFilter.endDate || new Date(payment.createdAt) <= new Date(dateFilter.endDate))
    );
      
    return matchesSearch && matchesDateRange;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter({ startDate: "", endDate: "" });
  };

  if (status === "loading") {
    return (<div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
            </div>)
  }

  if (status === "failed") {
    return (
      <div className="bg-white p-4 rounded-xl text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 md:p-6">
      {/* Header with Title and Filter Button */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Payment History</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="text-[var(--theme-color)] border border-[var(--theme-color)] shadow-sm rounded-md px-4 md:px-6 py-1.5 text-sm md:text-base hover:bg-[var(--theme-color)] hover:text-white transition-colors whitespace-nowrap"
        >
          {showFilters ? 'Close Filter' : 'Filter'}
        </button>
      </div>

      {/* Search and Export Bar */}
      <div className="bg-white mb-4 md:mb-6 p-4 md:p-6 rounded-md">
        <PaymentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Date Filters Section */}
        <PaymentFilters 
          hasActiveFilters={hasActiveFilters} 
          clearFilters={clearFilters} 
          showFilters={showFilters} 
          dateFilter={dateFilter} 
          setDateFilter={setDateFilter} 
        />
      </div>

      {/* Payment Table */}
      <PaymentTable filteredPayments={filteredPayments} />
    </div>
  );
}