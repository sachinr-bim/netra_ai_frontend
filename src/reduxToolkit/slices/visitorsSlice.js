// visitorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchVisitorsByGender = createAsyncThunk(
  'visitor/fetchVisitorsByGender',
  async ({ shopId, startDate, endDate }, { getState }) => {
    const token = getState().auth.userToken;
    const response = await axios.get(`${API_URL}/api/shop_visitor/shop/${shopId}/gender/count`, {
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
export const fetchVisitorsByDateRange = createAsyncThunk(
  'visitor/fetchVisitorsByDateRange',
  async ({ shopId, startDate, endDate }, { getState }) => {
    const token = getState().auth.userToken;
    const response = await axios.get(`${API_URL}/api/shop_visitor/shop/${shopId}/count/date`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate
      }
    });
    
    return { shopId, data: response.data.data, startDate, endDate };
  }
);

const initialState = {
  visitorsByGender: {},
  visitorsByDateRange: {},
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
      .addCase(fetchVisitorsByDateRange.pending, (state) => {
        state.dateRangeLoading = true;
        state.error = null;
      })
      .addCase(fetchVisitorsByDateRange.fulfilled, (state, action) => {
        state.dateRangeLoading = false;
        const { shopId, data } = action.payload;
        state.visitorsByDateRange[shopId] = data;
      })
      .addCase(fetchVisitorsByDateRange.rejected, (state, action) => {
        state.dateRangeLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setDateRange } = visitorSlice.actions;
export default visitorSlice.reducer;