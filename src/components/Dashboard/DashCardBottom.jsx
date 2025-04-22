import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import DottedList from "../../assets/icons/DottedList";
import { useSelector } from "react-redux";

export default function DashCardBottom({ navigateSubscription }) {
    // Get upcoming payments from Redux store
    const upcomingPayments = useSelector((state) => state.subscription.upcomingPayments);
    
    // Sample employee behavior data
    const employeeData = [
        { name: 'John D.', efficiency: 85, sales: 45, attendance: 95, shop: 'Downtown Store' },
        { name: 'Sarah K.', efficiency: 78, sales: 32, attendance: 90, shop: 'Downtown Store' },
        { name: 'Mike T.', efficiency: 92, sales: 28, attendance: 98, shop: 'Mall Branch' },
        { name: 'Emma R.', efficiency: 88, sales: 38, attendance: 92, shop: 'Airport Kiosk' },
        { name: 'David L.', efficiency: 82, sales: 42, attendance: 96, shop: 'Suburban Outlet' }
    ];

    // State for shop filter
    const [selectedShop, setSelectedShop] = useState("all");
    
    // Get unique shops for dropdown
    const shopOptions = [
        { value: "all", label: "All Shops" },
        ...Array.from(new Set(employeeData.map(emp => emp.shop))).map(shop => ({
            value: shop,
            label: shop
        }))
    ];

    // Filter employees by selected shop
    const filteredEmployees = selectedShop === "all" 
        ? employeeData 
        : employeeData.filter(emp => emp.shop === selectedShop);

    // Prepare data for pie chart (average metrics)
    const getAverageMetrics = () => {
        if (filteredEmployees.length === 0) return [];
        
        const avgEfficiency = Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.efficiency, 0) / filteredEmployees.length);
        const avgSales = Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.sales, 0) / filteredEmployees.length);
        const avgAttendance = Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.attendance, 0) / filteredEmployees.length);

        return [
            { name: 'Efficiency', value: avgEfficiency, color: '#4ECDC4' },
            { name: 'Sales', value: avgSales, color: '#8884d8' },
            { name: 'Attendance', value: avgAttendance, color: '#FFA07A' }
        ];
    };

    const pieData = getAverageMetrics();

    const renderCustomizedLabel = ({ name, percent }) => {
        return `${name}: ${(percent * 100).toFixed(0)}%`;
    };

    return (
        <div className="mt-4 md:mt-6 flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Employee Behavior Analysis Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg w-full lg:w-1/2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <h3 className="text-base md:text-lg font-bold">Employee Behavior Analysis</h3>
                    <div className="flex-1 min-w-[150px] max-w-[200px]">
                        <select
                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                            value={selectedShop}
                            onChange={(e) => setSelectedShop(e.target.value)}
                        >
                            {shopOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="h-[250px] w-full md:w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value, name) => [`${value}`, name]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-1 gap-3">
                            {pieData.map((metric, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{metric.name}</span>
                                        <span className="text-sm font-bold" style={{ color: metric.color }}>
                                            {metric.value}{metric.name === 'Sales' ? '' : '%'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div 
                                            className="h-2 rounded-full" 
                                            style={{ 
                                                width: `${metric.value}%`,
                                                backgroundColor: metric.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Payments Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg w-full lg:w-1/2 overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h3 className="text-lg md:text-xl font-medium">Upcoming Payments</h3>
                    <button 
                        className="bg-[var(--theme-color)] text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)]"
                        onClick={navigateSubscription}
                    >
                        Manage Subscriptions
                    </button>
                </div>
                <div className="mt-3">
                    <div className="min-w-[600px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#fff5e7]">
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Shop Name</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Due Date</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Amount</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Plan</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Renewal Date</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Status</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingPayments.map((payment) => (
                                    <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-900">
                                            {payment.name}
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            {payment.dueDate}
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm font-medium">
                                            {payment.amount}
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                payment.plan === "Premium" ? "bg-purple-100 text-purple-800" :
                                                payment.plan === "Enterprise" ? "bg-blue-100 text-blue-800" :
                                                "bg-gray-100 text-gray-800"
                                            }`}>
                                                {payment.plan}
                                            </span>
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            {payment.renewalDate}
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <DottedList size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}