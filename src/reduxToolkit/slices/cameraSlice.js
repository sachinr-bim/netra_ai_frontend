import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 

// Async Thunk for creating camera
export const createCameraAPI = createAsyncThunk(
  'cameras/createCamera',
  async (cameraData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        `${API_URL}/api/camera/create`,
        cameraData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Camera Added:',response.data)
      return response.data;
    } catch (error) {
        console.log('Failed:',error.response?.data?.message || error.message)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//  Async Thunk for getting cameras by shopId
export const fetchCamerasByShopIdAPI = createAsyncThunk(
  'cameras/fetchCamerasByShopId',
  async (shopId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${API_URL}/api/camera/shop/${shopId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      return response.data; // Assuming the API returns an array of cameras
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Async Thunk for deleting camera
export const deleteCameraAPI = createAsyncThunk(
  'cameras/deleteCamera',
  async (cameraId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(
        `${API_URL}/api/camera/delete/${cameraId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return { cameraId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async Thunk for updating camera
export const updateCameraAPI = createAsyncThunk(
  'cameras/updateCamera',
  async ({ cameraId, cameraData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `${API_URL}/api/camera/update/${cameraId}`,
        cameraData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState = {
  cameras: [],
  status: 'idle',
  error: null
};

const cameraSlice = createSlice({
  name: "cameras",
  initialState,
  reducers: {
    resetCameraStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCameraAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCameraAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cameras.push(action.payload);
      })
      .addCase(createCameraAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Camera By Shop reducers
      .addCase(fetchCamerasByShopIdAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCamerasByShopIdAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasByShopIdAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Camera reducers
      .addCase(deleteCameraAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCameraAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cameras = state.cameras.filter(
          camera => camera.id !== action.payload.cameraId
        );
      })
      .addCase(deleteCameraAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Camera reducers
      .addCase(updateCameraAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCameraAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedCamera = action.payload;
        const index = state.cameras.findIndex(c => c.camera_id === updatedCamera.camera_id);
        if (index !== -1) {
          state.cameras[index] = updatedCamera;
        }
      })
      .addCase(updateCameraAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetCameraStatus, removeCamera } = cameraSlice.actions;
export default cameraSlice.reducer;