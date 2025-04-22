import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnomalyChart({ anomaliesDateRange, setAnomaliesDateRange, anomalyType, setAnomalyType, ANOMALY_TYPES, anomaliesData, COLORS }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
    <h3 className="text-lg font-bold text-gray-800">Anomalies by Count</h3>
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="text-sm border border-gray-300 rounded-md px-3 py-2"
            value={anomaliesDateRange.start.toISOString().split('T')[0]}
            onChange={(e) => setAnomaliesDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            className="text-sm border border-gray-300 rounded-md px-3 py-2"
            value={anomaliesDateRange.end.toISOString().split('T')[0]}
            onChange={(e) => setAnomaliesDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
          />
        </div>
      </div>

      {/* Anomaly Type Dropdown */}
      <div className="min-w-[150px]">
        <label htmlFor="anomaly-type-select" className="block text-xs font-medium text-gray-700 mb-1">Anomaly Type</label>
        <select
          id="anomaly-type-select"
          className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          value={anomalyType}
          onChange={(e) => setAnomalyType(e.target.value)}
        >
          {ANOMALY_TYPES.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
  {/* Chart */}
  <div className="h-[300px]">
    {anomaliesData && anomaliesData.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={anomaliesData}
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
        <p className="text-gray-500 text-2xl">No Data Found</p>
      </div>
    )}
  </div>
</div>

  );
}