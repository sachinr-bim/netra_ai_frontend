import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnomaliesByDateRange, fetchAnomaliesForTenant, clearDateFilteredAnomalies } from "../../../reduxToolkit/slices/anomalySlice";

export default function AnomalyChart({ shops = [], COLORS }) {
  const dispatch = useDispatch();
  const { 
    anomalies, 
    dateFilteredAnomalies,
    loading 
  } = useSelector((state) => ({
    anomalies: state.anomaly.anomalies || [],
    dateFilteredAnomalies: state.anomaly.dateFilteredAnomalies || [],
    loading: state.anomaly.loading
  }));
  
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedType, setSelectedType] = useState('all');
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  // Create shop name mapping
  const shopMap = useMemo(() => {
    return shops.reduce((map, shop) => {
      if (shop && shop.id) map[shop.id] = shop.name;
      return map;
    }, {});
  }, [shops]);

  // Get unique anomaly types
  const anomalyTypes = useMemo(() => {
    const types = new Set();
    const sourceData = isDateFilterActive ? dateFilteredAnomalies : anomalies;
    sourceData.forEach(a => {
      if (a && a.anomaly_type) types.add(a.anomaly_type);
    });
    return [
      { value: "all", label: "All Types" },
      ...Array.from(types).map(type => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1)
      }))
    ];
  }, [anomalies, dateFilteredAnomalies, isDateFilterActive]);

  // Handle date range changes
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      setIsDateFilterActive(true);
      dispatch(clearDateFilteredAnomalies());
      
      // Fetch anomalies for each shop in the selected date range
      shops.forEach(shop => {
        if (shop && shop.id) {
          dispatch(fetchAnomaliesByDateRange({
            shopId: shop.id,
            startDate: dateRange.start,
            endDate: dateRange.end
          }));
        }
      });
    } else {
      setIsDateFilterActive(false);
      dispatch(fetchAnomaliesForTenant());
    }
  }, [dateRange, dispatch, shops]);

  // Process data for the chart
  const chartData = useMemo(() => {
    const sourceData = isDateFilterActive ? dateFilteredAnomalies : anomalies;
    let filtered = [...sourceData];
    
    // Filter by selected type if not "all"
    if (selectedType !== 'all') {
      filtered = filtered.filter(a => a.anomaly_type === selectedType);
    }
    
    // Group by shop and count anomalies
    const shopCounts = filtered.reduce((acc, anomaly) => {
      if (anomaly && anomaly.shop_id) {
        const shopId = anomaly.shop_id;
        acc[shopId] = (acc[shopId] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Format data for chart
    return Object.entries(shopCounts).map(([shopId, count]) => ({
      shopId,
      name: shopMap[shopId] || `Shop ${shopId}`,
      count,
      type: filtered.find(a => a.shop_id === parseInt(shopId))?.anomaly_type || 'N/A'
    })).sort((a, b) => b.count - a.count); // Sort by count descending
  }, [anomalies, dateFilteredAnomalies, isDateFilterActive, selectedType, shopMap]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Anomalies by Count</h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="text-sm border border-gray-300 rounded-md px-3 py-2"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                max={dateRange.end || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="text-sm border border-gray-300 rounded-md px-3 py-2"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                min={dateRange.start}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="min-w-[150px]">
            <label htmlFor="anomaly-type-select" className="block text-xs font-medium text-gray-700 mb-1">
              Anomaly Type
            </label>
            <select
              id="anomaly-type-select"
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {anomalyTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading anomaly data...</p>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              barSize={30}
            >
              <XAxis
                dataKey="name"
                fontSize={14}
                tickMargin={10}
                label={{
                  value: "Shop Name",
                  position: "insideBottom",
                  offset: -24,
                  fontSize: 15,
                }}
              />
              <YAxis
                fontSize={12}
                label={{
                  value: "Anomaly Count",
                  angle: -90,
                  position: 'insideLeft',
                  fontSize: 12,
                  offset: -5
                }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  return [`${value} anomalies`, `Type: ${props.payload.type || 'N/A'}`];
                }}
                labelFormatter={(label) => `${label}`}
              />
              <Bar
                dataKey="count"
                name="Anomalies"
                fill={COLORS.anomalies}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-2xl">
              {isDateFilterActive 
                ? "No anomalies found in selected date range" 
                : "No anomalies found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}