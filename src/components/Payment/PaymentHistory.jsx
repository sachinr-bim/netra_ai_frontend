import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import PaymentSearch from "./PaymentSearch";

export default function PaymentHistory() {
  const { payments } = useSelector(state => state.payments);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });

  const hasActiveFilters = searchTerm || dateFilter.startDate || dateFilter.endDate;

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = !searchTerm || 
      [payment.id, payment.plan, payment.method, payment.amount.toString()].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesDateRange = (
      (!dateFilter.startDate || new Date(payment.date) >= new Date(dateFilter.startDate)) &&
      (!dateFilter.endDate || new Date(payment.date) <= new Date(dateFilter.endDate))
    );
      
    return matchesSearch && matchesDateRange;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter({ startDate: "", endDate: "" });
  };

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
        <PaymentFilters hasActiveFilters={hasActiveFilters} clearFilters={clearFilters} showFilters={showFilters} dateFilter={dateFilter} setDateFilter={setDateFilter} />
        
      </div>

      {/* Payment Table */}
      <PaymentTable filteredPayments={filteredPayments} />
      
    </div>
  );
}