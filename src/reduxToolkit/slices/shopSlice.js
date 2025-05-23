import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// Packages and Libraries
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


export const createShopAPI = createAsyncThunk(
  'shops/createShop',
  async (shopData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      // Transform the shopData to match the API expected format
      const requestBody = {
        name: shopData.name,
        address: shopData.address,
        shop_pic: shopData.shop_pic, // Assuming location in your UI maps to address in API
        total_cameras: shopData.total_cameras || 0,
        total_admin: shopData.total_admin || 0,
        geo_latitude: shopData.coordinates?.lat || 0,
        geo_longitude: shopData.coordinates?.lng || 0
      };
      
      const response = await axios.post(
        `${API_URL}/api/shop/create`,
        requestBody, // Use the transformed request body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Create Shop Response:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Create Shop Error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Add this to your existing async thunks in shopSlice.js
export const uploadShopPicAPI = createAsyncThunk(
  'shops/uploadShopPic',
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const formData = new FormData();
      formData.append('shop_pic', file);

      const response = await axios.post(
        `${API_URL}/api/shop/uploadShopPic`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      return response.data; // Should contain the image URL
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchShopsByTenantAPI = createAsyncThunk(
  'shops/fetchShopsByTenant',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${API_URL}/api/shop/getByTenant`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      
      // Return empty array if no shops data
      console.log(response.data?.shops)
      return response.data?.shops || [];
    } catch (error) {
      console.log(error.response?.data?.message)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add this to your existing async thunks in shopSlice.js
export const fetchShopByIdAPI = createAsyncThunk(
  'shops/fetchShopById',
  async (shopId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${API_URL}/api/shop/getById/${shopId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      return response.data.shop;  // Access the shop object from response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteShopAPI = createAsyncThunk(
  'shops/deleteShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(
        `${API_URL}/api/shop/delete/${shopId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      return { shopId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add this to your existing async thunks in shopSlice.js
export const updateShopAPI = createAsyncThunk(
  'shops/updateShop',
  async ({ shopId, shopData }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      // Transform the shopData to match the API expected format
      const requestBody = {
        name: shopData.name,
        address: shopData.address,
        shop_pic: shopData.shop_pic,
        total_cameras: shopData.total_cameras || 0,
        total_admin: shopData.total_admin || 0,
        geo_latitude: shopData.coordinates?.lat || 0,
        geo_longitude: shopData.coordinates?.lng || 0
      };
      
      const response = await axios.put(
        `${API_URL}/api/shop/update/${shopId}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Update Shop Response:', response.data);
      return { shopId, updatedShop: response.data.shop };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Update Shop Error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk with Axios and Token Handling
export const createShopAdminAPI = createAsyncThunk(
  'shops/createShopAdmin',
  async (adminData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken'); // Get token from storage
      
      const response = await axios.post(
        `${API_URL}/api/user/createShopAdmin`,
        adminData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Create Admin Response:',response.data)
      return response.data;
    } catch (error) {
      // Handle specific error messages from API
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Create Admin Error',errorMessage)
      return rejectWithValue(errorMessage);
    }
  }
);

export const getShopAdminsAPI = createAsyncThunk(
  'shops/getShopAdmins',
  async (shopId, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log('token:', token);
      
      const response = await axios.get(
        `${API_URL}/api/user/getShopAdminsByShop/${shopId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log('Admins', response.data)
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Tenant Error:', error.response?.data?.message);
      return rejectWithValue(errorMessage);
    }
  }
);

// Update the existing updateShopAdminAPI or add this if not present
export const updateShopAdminAPI = createAsyncThunk(
  'shops/updateShopAdmin',
  async ({ id, adminData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await axios.put(
        `${API_URL}/api/user/updateShopAdmin/${id}`,
        adminData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      return { id, updatedAdmin: response.data }; // Return both id and updated data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteShopAdminAPI = createAsyncThunk(
  'shops/deleteShopAdmin',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log('Deleting admin with id:', id);
      
      const response = await axios.delete(
        `${API_URL}/api/user/deleteShopAdmin/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Delete Admin Response:', response.data);
      return id; // Return the id of the deleted admin
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Delete Admin Error', error.response?.data?.message);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  shops: [],
  selectedShop: null,
  admins: []  
};

const shopsSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        addShop: (state, action) => {
            return {...state, shops: [...state.shops, action.payload]}
        },
        updateShop: (state, action) => {
            const { id, updatedShop } = action.payload;
            const index = state.shops.findIndex((shop) => shop.id === id);
            if (index !== -1) {
                state.shops[index] = updatedShop;
            }
        },
        selectShop: (state, action) => {
          state.selectedShop = action.payload;
        },
        clearSelectedShop: (state) => {
            state.selectedShop = null;
        },
        deleteShop: (state, action) => {
            state.shops = state.shops.filter((shop) => shop.id !== action.payload);
        },
        addAdmin: (state, action) => {
          return {...state, admins: [...state.admins, action.payload]}
        },
        editAdmin: (state, action) => {
          return {...state, admins: state.admins.map((ele) => ele.id === action.payload.id ? {...ele, ...action.payload} : ele)}
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createShopAdminAPI.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(createShopAdminAPI.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload) {
        state.admins.push({
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          phone_number: action.payload.phone_number,
          password_hash: action.payload.password_hash
        });
      }
    })
    .addCase(createShopAdminAPI.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

      .addCase(createShopAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createShopAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops.push({
          id: action.payload.id || Date.now(),
          name: action.payload.name,
          shop_pic: action.payload.shop_pic || "https://via.placeholder.com/150",
          address: action.payload.address, // Map address back to location
          coordinates: { 
            lat: action.payload.geo_latitude || 0, 
            lng: action.payload.geo_longitude || 0 
          },
          total_admin: action.payload.total_admin,
          total_cameras: Array(action.payload.total_cameras || 0).fill().map((_, i) => ({
            id: i + 1,
            deviceModel: 'Unknown Model',
            RAM: 'Unknown',
            CPU: 'Unknown',
            SSD: 'Unknown',
            configuration: 'Unknown'
          }))
        });
    })
      .addCase(createShopAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateShopAdminAPI.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(updateShopAdminAPI.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.admins.findIndex(admin => admin.user_id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = {
          ...state.admins[index],
          ...action.payload.updatedAdmin
        };
      }
    })
    .addCase(updateShopAdminAPI.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(deleteShopAdminAPI.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(deleteShopAdminAPI.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.admins = state.admins.filter(admin => admin.id !== action.payload);
    })
    .addCase(deleteShopAdminAPI.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(fetchShopsByTenantAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchShopsByTenantAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload.map(shop => ({
          id: shop.shop_id,
          name: shop.name,
          address: shop.address,
          shop_pic: shop.shop_pic,
          total_admin: shop.total_admin,
          total_cameras: shop.total_cameras
        }));
      })
      .addCase(fetchShopsByTenantAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchShopByIdAPI.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchShopByIdAPI.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.selectedShop = {
        id: action.payload.shop_id,  // Use shop_id from API response
        name: action.payload.name,
        address: action.payload.address,
        total_admin: action.payload.total_admin,
        total_cameras: action.payload.total_cameras,
        geo_latitude: action.payload.geo_latitude,
        geo_longitude: action.payload.geo_longitude,
        // Add any other fields you need
      };
    })
    .addCase(fetchShopByIdAPI.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
      .addCase(deleteShopAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteShopAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = state.shops.filter(shop => shop.id !== action.payload.shopId);
      })
      .addCase(deleteShopAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Shop Admins API
      .addCase(getShopAdminsAPI.pending, (state) => {
      state.adminsStatus = 'loading';
      state.adminsError = null;
    })
    .addCase(getShopAdminsAPI.fulfilled, (state, action) => {
      state.adminsStatus = 'succeeded';
      state.admins = action.payload.map(admin => ({
        user_id: admin.user_id,
        tenant_id: admin.tenant_id,
        firstname: admin.userDetails.firstname,
        lastname: admin.userDetails.lastname,
        email: admin.userDetails.email,
        location: admin.userDetails.location,
        phone_number: admin.userDetails.phone_number,
        role_id: admin.userDetails.role_id,
        status: admin.userDetails.status,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
        // Add other fields as needed
      }));
    })
    .addCase(getShopAdminsAPI.rejected, (state, action) => {
      state.adminsStatus = 'failed';
      state.adminsError = action.payload;
    })
      // Update Shop API
      .addCase(updateShopAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateShopAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.shops.findIndex(shop => shop.id === action.payload.shopId);
        if (index !== -1) {
          state.shops[index] = {
            ...state.shops[index],
            ...action.payload.updatedShop
          };
        }
        if (state.selectedShop && state.selectedShop.id === action.payload.shopId) {
          state.selectedShop = {
            ...state.selectedShop,
            ...action.payload.updatedShop
          };
        }
      })
      .addCase(updateShopAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadShopPicAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadShopPicAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You might want to store the uploaded image URL somewhere
        // or handle it in the component directly
      })
      .addCase(uploadShopPicAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    },
});

export const { addShop, updateShop, deleteShop, addAdmin, editAdmin, selectShop, clearSelectedShop } = shopsSlice.actions;

export default shopsSlice.reducer;