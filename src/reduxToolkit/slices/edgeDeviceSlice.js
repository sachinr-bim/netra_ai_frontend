import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL

// Async Thunk for creating edge device
export const createEdgeDeviceAPI = createAsyncThunk(
  'edgeDevices/createEdgeDevice',
  async (deviceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.post(
        `${API_URL}/api/edge_device/create`,
        deviceData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Device Added Successfully'
      })
      console.log('Edge Device Added', response.data)
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk for fetching edge devices by shop
export const fetchEdgeDevicesByShopAPI = createAsyncThunk(
  'edgeDevices/fetchEdgeDevicesByShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.get(
        `${API_URL}/api/edge_device/shop/${shopId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data || [];
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteEdgeDeviceAPI = createAsyncThunk(
  'edgeDevices/deleteEdgeDevice',
  async (deviceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.delete(
        `${API_URL}/api/edge_device/delete/${deviceId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return { deviceId, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateEdgeDeviceAPI = createAsyncThunk(
  'edgeDevices/updateEdgeDevice',
  async ({ deviceId, deviceData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.put(
        `${API_URL}/api/edge_device/update/${deviceId}`,
        deviceData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return { deviceId, updatedDevice: response.data.device };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  devices: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  fetchStatus: 'idle',
  fetchError: null
};

const edgeDeviceSlice = createSlice({
  name: "edgeDevices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create device reducers
      .addCase(createEdgeDeviceAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEdgeDeviceAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devices.push(action.payload.device);
      })
      .addCase(createEdgeDeviceAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
       // Fetch devices reducers
      .addCase(fetchEdgeDevicesByShopAPI.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchEdgeDevicesByShopAPI.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.devices = action.payload;
      })
      .addCase(fetchEdgeDevicesByShopAPI.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.payload;
      })
      // Delete device reducers
      .addCase(deleteEdgeDeviceAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEdgeDeviceAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.devices = state.devices.filter(device => device.id !== action.payload.deviceId);
      })
      .addCase(deleteEdgeDeviceAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Edit device reducers
      .addCase(updateEdgeDeviceAPI.pending, (state) => {
         state.status = 'loading';
         state.error = null;
       })
       .addCase(updateEdgeDeviceAPI.fulfilled, (state, action) => {
         state.status = 'succeeded';
         const index = state.devices.findIndex(device => device.id === action.payload.deviceId);
         if (index !== -1) {
           state.devices[index] = {
             ...state.devices[index],
             ...action.payload.updatedDevice
           };
         }
       })
       .addCase(updateEdgeDeviceAPI.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload;
       })
  },
});

export default edgeDeviceSlice.reducer;