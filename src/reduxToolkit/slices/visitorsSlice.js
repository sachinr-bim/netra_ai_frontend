import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitors: [
    { dateTime: "2025-03-01T09:15:00", shopName: "Sailor Shop", gender: "male", ageGroup: "25-34", visitDuration: 15 },
    { dateTime: "2025-03-01T10:20:00", shopName: "Nike Shop", gender: "female", ageGroup: "18-24", visitDuration: 25 },
    { dateTime: "2025-03-02T11:30:00", shopName: "Adidas Store", gender: "male", ageGroup: "35-44", visitDuration: 20 },
    { dateTime: "2025-03-03T14:45:00", shopName: "Zara Fashion", gender: "female", ageGroup: "25-34", visitDuration: 30 },
    { dateTime: "2025-03-04T16:00:00", shopName: "Apple Store", gender: "male", ageGroup: "18-24", visitDuration: 40 },
    { dateTime: "2025-03-05T12:30:00", shopName: "Samsung Hub", gender: "female", ageGroup: "35-44", visitDuration: 18 },
    { dateTime: "2025-03-06T15:15:00", shopName: "Levi's Denim", gender: "male", ageGroup: "25-34", visitDuration: 22 },
    { dateTime: "2025-03-07T17:30:00", shopName: "H&M Clothing", gender: "female", ageGroup: "18-24", visitDuration: 28 },
    { dateTime: "2025-03-08T10:45:00", shopName: "Puma Outlet", gender: "male", ageGroup: "35-44", visitDuration: 35 },
    { dateTime: "2025-03-09T13:00:00", shopName: "Gucci Boutique", gender: "female", ageGroup: "25-34", visitDuration: 50 }
  ],

  aggregatedData: {
    all: [
      { shopId: "shop1", shopName: "Sailor Shop", male: 520, female: 730 },
      { shopId: "shop2", shopName: "Nike Shop", male: 780, female: 1110 },
      { shopId: "shop3", shopName: "Adidas Store", male: 650, female: 920 },
      { shopId: "shop4", shopName: "Zara Fashion", male: 420, female: 1150 },
      { shopId: "shop5", shopName: "Apple Store", male: 880, female: 620 },
      { shopId: "shop6", shopName: "Samsung Hub", male: 550, female: 850 },
      { shopId: "shop7", shopName: "Levi's Denim", male: 710, female: 790 },
      { shopId: "shop8", shopName: "H&M Clothing", male: 480, female: 1320 },
      { shopId: "shop9", shopName: "Puma Outlet", male: 630, female: 570 },
      { shopId: "shop10", shopName: "Gucci Boutique", male: 390, female: 910 }
    ],
    currentMonth: [
      { shopId: "shop1", shopName: "Sailor Shop", male: 120, female: 180 },
      { shopId: "shop2", shopName: "Nike Shop", male: 210, female: 290 },
      { shopId: "shop3", shopName: "Adidas Store", male: 150, female: 220 },
      { shopId: "shop4", shopName: "Zara Fashion", male: 90, female: 310 },
      { shopId: "shop5", shopName: "Apple Store", male: 240, female: 160 },
      { shopId: "shop6", shopName: "Samsung Hub", male: 130, female: 210 },
      { shopId: "shop7", shopName: "Levi's Denim", male: 180, female: 190 },
      { shopId: "shop8", shopName: "H&M Clothing", male: 110, female: 340 },
      { shopId: "shop9", shopName: "Puma Outlet", male: 160, female: 140 },
      { shopId: "shop10", shopName: "Gucci Boutique", male: 80, female: 210 }
    ],
    previousMonth: [
      { shopId: "shop1", shopName: "Sailor Shop", male: 110, female: 170 },
      { shopId: "shop2", shopName: "Nike Shop", male: 190, female: 270 },
      { shopId: "shop3", shopName: "Adidas Store", male: 140, female: 200 },
      { shopId: "shop4", shopName: "Zara Fashion", male: 80, female: 290 },
      { shopId: "shop5", shopName: "Apple Store", male: 220, female: 150 },
      { shopId: "shop6", shopName: "Samsung Hub", male: 120, female: 200 },
      { shopId: "shop7", shopName: "Levi's Denim", male: 170, female: 180 },
      { shopId: "shop8", shopName: "H&M Clothing", male: 100, female: 320 },
      { shopId: "shop9", shopName: "Puma Outlet", male: 150, female: 130 },
      { shopId: "shop10", shopName: "Gucci Boutique", male: 70, female: 190 }
    ],
    currentYear: [
      { shopId: "shop1", shopName: "Sailor Shop", male: 1500, female: 2100 },
      { shopId: "shop2", shopName: "Nike Shop", male: 2300, female: 3300 },
      { shopId: "shop3", shopName: "Adidas Store", male: 1800, female: 2600 },
      { shopId: "shop4", shopName: "Zara Fashion", male: 1200, female: 3500 },
      { shopId: "shop5", shopName: "Apple Store", male: 2800, female: 1900 },
      { shopId: "shop6", shopName: "Samsung Hub", male: 1600, female: 2500 },
      { shopId: "shop7", shopName: "Levi's Denim", male: 2100, female: 2300 },
      { shopId: "shop8", shopName: "H&M Clothing", male: 1400, female: 3900 },
      { shopId: "shop9", shopName: "Puma Outlet", male: 1900, female: 1700 },
      { shopId: "shop10", shopName: "Gucci Boutique", male: 1100, female: 2700 }
    ]
  }
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    addVisitor: (state, action) => {
      state.visitors.push(action.payload);
    },
    aggregateVisitorData: (state, action) => {
      const { startDate, endDate } = action.payload || {};
      
      if (!startDate || !endDate) {
        // Return default data if no date range provided
        return;
      }

      // Filter visitors based on date range
      const filteredVisitors = state.visitors.filter(visitor => {
        const visitorDate = new Date(visitor.dateTime);
        return visitorDate >= new Date(startDate) && visitorDate <= new Date(endDate);
      });

      // Aggregate the filtered data
      const aggregated = filteredVisitors.reduce((acc, visitor) => {
        const existing = acc.find(item => item.shopName === visitor.shopName);
        
        if (existing) {
          existing[visitor.gender]++;
        } else {
          acc.push({
            shopName: visitor.shopName,
            male: visitor.gender === 'male' ? 1 : 0,
            female: visitor.gender === 'female' ? 1 : 0
          });
        }
        
        return acc;
      }, []);

      // Update the 'all' data with the filtered aggregation
      state.aggregatedData.all = aggregated;
    }
  }
});

export const { addVisitor, aggregateVisitorData } = visitorSlice.actions;
export default visitorSlice.reducer;