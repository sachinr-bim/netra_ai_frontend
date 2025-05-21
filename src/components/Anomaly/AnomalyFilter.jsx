export default function AnomalyFilter({ anomalyTypes, filters, setFilters }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Anomaly Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.anomalyType}
          onChange={e => setFilters({...filters, anomalyType: e.target.value})}
        >
          <option value="">All Types</option>
          {anomalyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Status</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={filters.feedbackStatus}
          onChange={e => setFilters({...filters, feedbackStatus: e.target.value})}
        >
          <option value="">All</option>
          <option value="withFeedback">With Feedback</option>
          <option value="withoutFeedback">Without Feedback</option>
        </select>
      </div>
    </div>
  );
}