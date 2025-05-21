import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  anomalies: [],
  loading: false,
  error: null
};

export const fetchAnomaliesForTenant = createAsyncThunk(
  'anomaly/fetchForTenant',
  async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(
      'http://52.90.112.216/api/anomaly/getAnomaliesForTenant',
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
      `http://52.90.112.216/api/anomaly/shop/${shopId}`,
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

const anomalySlice = createSlice({
  name: "anomaly",
  initialState,
  reducers: {},
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
      });
  }
});

export default anomalySlice.reducer;