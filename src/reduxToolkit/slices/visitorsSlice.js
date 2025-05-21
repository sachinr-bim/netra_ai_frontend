// visitorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://52.90.112.216/api/shop_visitor/shop";

export const fetchVisitorsByGender = createAsyncThunk(
  'visitor/fetchVisitorsByGender',
  async ({ shopId, startDate, endDate }, { getState }) => {
    const token = getState().auth.userToken;
    const response = await axios.get(`${API_URL}/${shopId}/gender/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate
      }
    });
    
    // Transform the API response to our expected format
    const genderData = {
      male: 0,
      female: 0
    };
    
    response.data.data.forEach(item => {
      if (item.gender.toUpperCase() === 'FEMALE') {
        genderData.female = parseInt(item.count);
      } else if (item.gender.toUpperCase() === 'MALE') {
        genderData.male = parseInt(item.count);
      }
    });
    
    return { shopId, data: genderData };
  }
);

// New endpoint for date range filtering
export const fetchVisitorsByGenderWithDateRange = createAsyncThunk(
  'visitor/fetchVisitorsByGenderWithDateRange',
  async ({ shopId, startDate, endDate }, { getState }) => {
    const token = getState().auth.userToken;
    const response = await axios.get(`${API_URL}/${shopId}/gender/date`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { startDate, endDate }
    });
    
    const genderData = {
      male: 0,
      female: 0,
      startDate,
      endDate
    };
    
    response.data.data.forEach(item => {
      if (item.gender.toUpperCase() === 'FEMALE') {
        genderData.female = parseInt(item.count);
      } else if (item.gender.toUpperCase() === 'MALE') {
        genderData.male = parseInt(item.count);
      }
    });
    
    return { shopId, data: genderData };
  }
);

const initialState = {
  visitorsByGender: {},
  filteredVisitorsByGender: {}, // Separate store for filtered data
  loading: false,
  filterLoading: false,
  error: null,
  dateRange: {
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  }
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitorsByGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitorsByGender.fulfilled, (state, action) => {
        state.loading = false;
        const { shopId, data } = action.payload;
        state.visitorsByGender[shopId] = data;
      })
      .addCase(fetchVisitorsByGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Date range endpoint handlers
      .addCase(fetchVisitorsByGenderWithDateRange.pending, (state) => {
        state.filterLoading = true;
        state.error = null;
      })
      .addCase(fetchVisitorsByGenderWithDateRange.fulfilled, (state, action) => {
        state.filterLoading = false;
        const { shopId, data } = action.payload;
        state.filteredVisitorsByGender[shopId] = data;
      })
      .addCase(fetchVisitorsByGenderWithDateRange.rejected, (state, action) => {
        state.filterLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setDateRange } = visitorSlice.actions;
export default visitorSlice.reducer;