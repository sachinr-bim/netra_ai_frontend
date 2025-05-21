import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { 
  fetchVisitorsByGender, 
  fetchVisitorsByDateRange,
  setDateRange 
} from '../../../reduxToolkit/slices/visitorsSlice';
import { fetchShopsByTenantAPI } from '../../../reduxToolkit/slices/shopSlice';

const renderCustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function VisitorsChart({ COLORS }) {
  const dispatch = useDispatch();
  const { shops, loading: shopsLoading } = useSelector((state) => state.shops);
  const { 
    visitorsByGender, 
    visitorsByDateRange,
    loading, 
    dateRangeLoading,
    error,
    dateRange 
  } = useSelector((state) => state.visitor);
  
  const [isFiltered, setIsFiltered] = useState(false);

  // Initialize with empty dates
  const getDefaultDates = () => {
    return {
      startDate: '',
      endDate: ''
    };
  };

  // Load shops data
  useEffect(() => {
    dispatch(fetchShopsByTenantAPI());
  }, [dispatch]);

  // Load default visitor data when shops are loaded and not filtered
  useEffect(() => {
    if (shops && shops.length > 0 && !isFiltered) {
      shops.forEach(shop => {
        dispatch(fetchVisitorsByGender({ 
          shopId: shop.id
        }));
      });
    }
  }, [dispatch, shops, isFiltered]);

  // Handle date range changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDateRange = { ...dateRange, [name]: value };
    dispatch(setDateRange(newDateRange));
    
    // Only apply filter if both dates are selected
    if (newDateRange.startDate && newDateRange.endDate) {
      applyDateFilter(newDateRange);
    } else {
      // If either date is cleared, reset to default view
      resetFilters();
    }
  };

  // Apply date filter to all shops
  const applyDateFilter = (range) => {
    if (shops && shops.length > 0 && range.startDate && range.endDate) {
      setIsFiltered(true);
      shops.forEach(shop => {
        dispatch(fetchVisitorsByDateRange({ 
          shopId: shop.id,
          startDate: range.startDate,
          endDate: range.endDate
        }));
      });
    }
  };

  // Reset to default view with empty dates
  const resetFilters = () => {
    setIsFiltered(false);
    dispatch(setDateRange(getDefaultDates()));
  };

  // Prepare chart data based on whether we're showing filtered or default data
  const chartData = shops?.map(shop => {
    const sourceData = isFiltered ? visitorsByDateRange[shop.id] : visitorsByGender[shop.id];
    
    return {
      name: shop.name || `Shop ${shop.id}`,
      male: sourceData?.male || 0,
      female: sourceData?.female || 0,
      total: (sourceData?.male || 0) + (sourceData?.female || 0)
    };
  }) || [];

  const isLoading = loading || dateRangeLoading || shopsLoading;
  const showResetButton = isFiltered || dateRange.startDate || dateRange.endDate;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Visitors by Gender</h3>

        <div className="flex flex-wrap sm:flex-nowrap items-end gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              max={dateRange.endDate || new Date().toISOString().split('T')[0]}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              min={dateRange.startDate}
              max={new Date().toISOString().split('T')[0]}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          {showResetButton && (
            <button 
              onClick={resetFilters}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Clear Dates
            </button>
          )}
        </div>
      </div>

      <div className="h-[300px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading visitor data...</p>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              barSize={30}
              barGap={2}
            >
              <XAxis
                dataKey="name"
                fontSize={14}
                tickMargin={10}
                label={{
                  value: "Shop Name",
                  position: "insideBottom",
                  offset: -10,
                  fontSize: 15
                }}
              />
              <YAxis
                fontSize={12}
                label={{
                  value: "Visitor Count",
                  angle: -90,
                  position: 'insideLeft',
                  fontSize: 12,
                  offset: -5
                }}
              />
              <Tooltip
                formatter={(value, name) => [`${value} ${name.toLowerCase()} visitors`]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend content={renderCustomizedLegend} />
              <Bar
                dataKey="male"
                name="Male"
                fill={COLORS.visitors.male}
                stackId="a"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="female"
                name="Female"
                fill={COLORS.visitors.female}
                stackId="a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-2xl">No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
}