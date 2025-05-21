// VisitorsChart.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchVisitorsByGender, setDateRange } from '../../../reduxToolkit/slices/visitorsSlice';
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
    loading, 
    error,
    dateRange 
  } = useSelector((state) => state.visitor);

  useEffect(() => {
    dispatch(fetchShopsByTenantAPI());
  }, [dispatch]);

  useEffect(() => {
    if (shops && shops.length > 0) {
      shops.forEach(shop => {
        dispatch(fetchVisitorsByGender({ 
          shopId: shop.id, 
          startDate: dateRange.startDate, 
          endDate: dateRange.endDate 
        }));
      });
    }
  }, [dispatch, dateRange, shops]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDateRange({ ...dateRange, [name]: value }));
  };

  // Transform data for chart using actual shop data
  const chartData = shops?.map(shop => {
    const shopData = visitorsByGender[shop.id] || { male: 0, female: 0 };
    return {
      name: shop.name || `Shop ${shop.id}`,
      male: shopData.male || 0,
      female: shopData.female || 0
    };
  }) || [];

  if (shopsLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Loading shops data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Visitors by Gender</h3>

        {/* Date Range Inputs */}
        <div className="flex flex-wrap sm:flex-nowrap items-end gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="text-sm border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="text-sm border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        {loading ? (
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