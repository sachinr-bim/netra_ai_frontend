import React from 'react'

// Packages and Libraries
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function VisitorsChart({ visitorsDateRange, setVisitorsDateRange, visitorsData, renderCustomizedLegend, COLORS }) {
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
              className="text-sm border border-gray-300 rounded-md px-3 py-2"
              value={visitorsDateRange.start.toISOString().split('T')[0]}
              onChange={(e) => setVisitorsDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="text-sm border border-gray-300 rounded-md px-3 py-2"
              value={visitorsDateRange.end.toISOString().split('T')[0]}
              onChange={(e) => setVisitorsDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        {visitorsData && visitorsData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={visitorsData}
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
  )
}
