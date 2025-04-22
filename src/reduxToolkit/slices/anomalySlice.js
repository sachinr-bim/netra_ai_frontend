import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  anomaly: [
    { dateTime: "2025-03-01T09:15:00", shopName: "Sailor Shop", type: "Theft Alerts" },
    { dateTime: "2025-03-01T10:20:00", shopName: "Nike Shop", type: "Suspicious behaviours" },
    { dateTime: "2025-03-02T11:30:00", shopName: "Adidas Store", type: "Fighting Behaviour" },
    { dateTime: "2025-03-03T14:45:00", shopName: "Zara Fashion", type: "Aggressive" },
    { dateTime: "2025-03-04T16:00:00", shopName: "Apple Store", type: "Gesture Detection" },
    { dateTime: "2025-03-05T12:30:00", shopName: "Samsung Hub", type: "Fall Detection" },
    { dateTime: "2025-03-06T15:15:00", shopName: "Levi's Denim", type: "Weapon Detection" },
    { dateTime: "2025-03-07T17:30:00", shopName: "H&M Clothing", type: "Theft Alerts" },
    { dateTime: "2025-03-08T10:45:00", shopName: "Puma Outlet", type: "Suspicious behaviours" },
    { dateTime: "2025-03-09T13:00:00", shopName: "Gucci Boutique", type: "Fighting Behaviour" },
    { dateTime: "2025-03-10T09:15:00", shopName: "Sailor Shop", type: "Aggressive" },
    { dateTime: "2025-03-11T10:20:00", shopName: "Nike Shop", type: "Gesture Detection" },
    { dateTime: "2025-03-12T11:30:00", shopName: "Adidas Store", type: "Fall Detection" },
    { dateTime: "2025-03-13T14:45:00", shopName: "Zara Fashion", type: "Weapon Detection" },
    { dateTime: "2025-03-14T16:00:00", shopName: "Apple Store", type: "Theft Alerts" }
  ],

  aggregatedData: {
    all: [
      { shopName: "Sailor Shop", count: 12, type: "Theft Alerts" },
      { shopName: "Nike Shop", count: 19, type: "Suspicious behaviours" },
      { shopName: "Adidas Store", count: 8, type: "Fighting Behaviour" },
      { shopName: "Zara Fashion", count: 15, type: "Aggressive" },
      { shopName: "Apple Store", count: 10, type: "Gesture Detection" },
      { shopName: "Samsung Hub", count: 14, type: "Fall Detection" },
      { shopName: "Levi's Denim", count: 6, type: "Weapon Detection" },
      { shopName: "H&M Clothing", count: 12, type: "Theft Alerts" },
      { shopName: "Puma Outlet", count: 9, type: "Suspicious behaviours" },
      { shopName: "Gucci Boutique", count: 7, type: "Fighting Behaviour" }
    ],
    currentMonth: [
      { shopName: "Sailor Shop", count: 5, type: "Theft Alerts" },
      { shopName: "Nike Shop", count: 8, type: "Suspicious behaviours" },
      { shopName: "Adidas Store", count: 3, type: "Fighting Behaviour" },
      { shopName: "Zara Fashion", count: 6, type: "Aggressive" },
      { shopName: "Apple Store", count: 4, type: "Gesture Detection" },
      { shopName: "Samsung Hub", count: 7, type: "Fall Detection" },
      { shopName: "Levi's Denim", count: 2, type: "Weapon Detection" },
      { shopName: "H&M Clothing", count: 5, type: "Theft Alerts" },
      { shopName: "Puma Outlet", count: 4, type: "Suspicious behaviours" },
      { shopName: "Gucci Boutique", count: 3, type: "Fighting Behaviour" }
    ],
    previousMonth: [
      { shopName: "Sailor Shop", count: 4, type: "Theft Alerts" },
      { shopName: "Nike Shop", count: 7, type: "Suspicious behaviours" },
      { shopName: "Adidas Store", count: 2, type: "Fighting Behaviour" },
      { shopName: "Zara Fashion", count: 5, type: "Aggressive" },
      { shopName: "Apple Store", count: 3, type: "Gesture Detection" },
      { shopName: "Samsung Hub", count: 6, type: "Fall Detection" },
      { shopName: "Levi's Denim", count: 1, type: "Weapon Detection" },
      { shopName: "H&M Clothing", count: 4, type: "Theft Alerts" },
      { shopName: "Puma Outlet", count: 3, type: "Suspicious behaviours" },
      { shopName: "Gucci Boutique", count: 2, type: "Fighting Behaviour" }
    ],
    currentYear: [
      { shopName: "Sailor Shop", count: 45, type: "Theft Alerts" },
      { shopName: "Nike Shop", count: 68, type: "Suspicious behaviours" },
      { shopName: "Adidas Store", count: 32, type: "Fighting Behaviour" },
      { shopName: "Zara Fashion", count: 55, type: "Aggressive" },
      { shopName: "Apple Store", count: 40, type: "Gesture Detection" },
      { shopName: "Samsung Hub", count: 57, type: "Fall Detection" },
      { shopName: "Levi's Denim", count: 22, type: "Weapon Detection" },
      { shopName: "H&M Clothing", count: 45, type: "Theft Alerts" },
      { shopName: "Puma Outlet", count: 38, type: "Suspicious behaviours" },
      { shopName: "Gucci Boutique", count: 27, type: "Fighting Behaviour" }
    ]
  }
};

const anomalySlice = createSlice({
  name: "anomaly",
  initialState,
  reducers: {
    addAnomaly: (state, action) => {
      state.anomaly.push(action.payload);
    },
    deleteAnomaly: (state, action) => {
      state.anomaly = state.anomaly.filter((_, index) => index !== action.payload);
    },
    updateAnomaly: (state, action) => {
      const { index, updatedData } = action.payload;
      state.anomaly[index] = updatedData;
    },
    aggregateAnomalyData: (state, action) => {
      const { startDate, endDate } = action.payload || {};
      
      if (!startDate || !endDate) {
        // Return default data if no date range provided
        return;
      }

      // Filter anomalies based on date range
      const filteredAnomalies = state.anomaly.filter(anomaly => {
        const anomalyDate = new Date(anomaly.dateTime);
        return anomalyDate >= new Date(startDate) && anomalyDate <= new Date(endDate);
      });

      // Aggregate the filtered data
      const aggregated = filteredAnomalies.reduce((acc, anomaly) => {
        const existing = acc.find(item => 
          item.shopName === anomaly.shopName && item.type === anomaly.type
        );
        
        if (existing) {
          existing.count++;
        } else {
          acc.push({
            shopName: anomaly.shopName,
            count: 1,
            type: anomaly.type
          });
        }
        
        return acc;
      }, []);

      // Update the 'all' data with the filtered aggregation
      state.aggregatedData.all = aggregated;
    }
  }
});

export const { addAnomaly, deleteAnomaly, updateAnomaly, aggregateAnomalyData } = anomalySlice.actions;
export default anomalySlice.reducer;