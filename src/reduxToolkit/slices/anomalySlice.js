import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  anomalies: [],
  filteredAnomalies: [],
  loading: false,
  error: null,
  pagination: {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 12
  },
  dateFilteredAnomalies: [] // New state for date-filtered anomalies
};

export const fetchAnomaliesForTenant = createAsyncThunk(
  'anomaly/fetchForTenant',
  async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(
      `${API_URL}/api/anomaly/getAnomaliesForTenant`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.anomalies;
  }
);

export const fetchAnomaliesByShopId = createAsyncThunk(
  'anomaly/fetchByShopId',
  async (shopId) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(
      `${API_URL}/api/anomaly/shop/${shopId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.data;
  }
);

export const fetchAnomaliesByDateRange = createAsyncThunk(
  'anomaly/fetchByDateRange',
  async ({ shopId, startDate, endDate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${API_URL}/api/anomaly/shop/${shopId}/date`,
        {
          params: {
            startDate,
            endDate
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { 
        shopId, 
        anomalies: response.data.result || [],
        startDate,
        endDate
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterAnomalies = createAsyncThunk(
  'anomaly/filter',
  async (filterParams, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        `${API_URL}/api/anomaly/filter`,
        filterParams,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const anomalySlice = createSlice({
  name: "anomaly",
  initialState,
  reducers: {
    clearDateFilteredAnomalies: (state) => {
      state.dateFilteredAnomalies = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnomaliesForTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnomaliesForTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.anomalies = action.payload;
      })
      .addCase(fetchAnomaliesForTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAnomaliesByShopId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnomaliesByShopId.fulfilled, (state, action) => {
        state.loading = false;
        state.anomalies = action.payload;
      })
      .addCase(fetchAnomaliesByShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAnomaliesByDateRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnomaliesByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        // Store date-filtered anomalies separately
        state.dateFilteredAnomalies = [
          ...state.dateFilteredAnomalies,
          ...action.payload.anomalies
        ];
      })
      .addCase(fetchAnomaliesByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(filterAnomalies.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterAnomalies.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredAnomalies = action.payload.data;
        state.pagination = {
          ...state.pagination,
          totalItems: action.payload.pagination.totalItems,
          totalPages: action.payload.pagination.totalPages,
          pageSize: action.payload.pagination.pageSize
        };
      })
      .addCase(filterAnomalies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export const { clearDateFilteredAnomalies, setCurrentPage } = anomalySlice.actions;
export default anomalySlice.reducer;