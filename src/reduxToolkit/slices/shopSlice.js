import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export const createShopAPI = createAsyncThunk(
  'shops/createShop',
  async (shopData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log('token:', token);
      
      const response = await axios.post(
        "http://52.90.112.216/api/shop/create",
        shopData,
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

// Async Thunk with Axios and Token Handling
export const createShopAdminAPI = createAsyncThunk(
  'shops/createShopAdmin',
  async (adminData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken'); // Get token from storage
      console.log('token:',token)
      
      const response = await axios.post(
        "http://52.90.112.216/api/user/createShopAdmin",
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

export const updateShopAdminAPI = createAsyncThunk(
  'shops/updateShopAdmin',
  async ({ id, adminData }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log('Updating admin with data:', adminData);
      
      const response = await axios.put(
        `http://52.90.112.216/api/user/updateShopAdmin/${id}`,
        adminData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Update Admin Response:', response.data);
      return { id, ...response.data }; // Return both id and updated data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log('Update Admin Error', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  shops: [
    {
      id: 1,
      name: "Sailor Shop",
      image: "https://i.redd.it/the-newly-renovated-sailor-moon-store-in-tokyo-v0-64ti7re36mjd1.jpg?width=4032&format=pjpg&auto=webp&s=bb96249bd51937f15589fbe4e05c43c0e985b0bc",
      location: "New York, USA",
      coordinates: { lat: 35.6895, lng: 139.6917 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 2,
      name: "Nike Shop",
      image: "https://static.nike.com/a/images/f_auto/c8a2ec76-6665-4203-8852-f4ee668aaa7a/image.jpg",
      location: "Los Angeles, USA",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 3,
      name: "Infinity Shop",
      image: "https://mokokchungtimes.com/wp-content/uploads/2022/12/infinity-in-mokokchung.jpg",
      location: "Chicago, USA",
      coordinates: { lat: 41.8781, lng: -87.6298 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 4,
      name: "Brand Shop",
      image: "https://media.assettype.com/gulfnews%2Fimport%2F2022%2F07%2F25%2FBRANDS_18234f6ab4c_large.jpg",
      location: "San Francisco, USA",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 5,
      name: "Sailor Shop",
      image: "https://i.redd.it/the-newly-renovated-sailor-moon-store-in-tokyo-v0-64ti7re36mjd1.jpg?width=4032&format=pjpg&auto=webp&s=bb96249bd51937f15589fbe4e05c43c0e985b0bc",
      location: "New York, USA",
      coordinates: { lat: 35.6895, lng: 139.6917 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 6,
      name: "Nike Shop",
      image: "https://static.nike.com/a/images/f_auto/c8a2ec76-6665-4203-8852-f4ee668aaa7a/image.jpg",
      location: "Los Angeles, USA",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 7,
      name: "Infinity Shop",
      image: "https://mokokchungtimes.com/wp-content/uploads/2022/12/infinity-in-mokokchung.jpg",
      location: "Chicago, USA",
      coordinates: { lat: 41.8781, lng: -87.6298 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    },
    {
      id: 8,
      name: "Brand Shop",
      image: "https://media.assettype.com/gulfnews%2Fimport%2F2022%2F07%2F25%2FBRANDS_18234f6ab4c_large.jpg",
      location: "San Francisco, USA",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      adminCount: 10,
      cameras: [
        {id: 1, deviceModel: 'NVIDIA Jetson AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'NVIDIA Jetson with 256 CUDA Cores or Equivalent'},
        {id: 2, deviceModel: 'Sony Camera AGX Orin', RAM: '2 GB', CPU: '4 Core', SSD: '128 GB', configuration: 'Sony Camera with 125 CUDA Cores or Equivalent'}
    ],
    selectedShop: null
    },
  ],
  

    admins: [
        {
          id: 1,
          name: "John Mark",
          image: "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
          location: "Newyork Street, America",
          shop: 'Nike Shop',
          email: 'johnmark@gmail.com',
          phone: '8435644990'
        },
        {
          id: 2,
          name: "Peter Parker",
          image: "https://cdn.prod.website-files.com/639ff8596ae419fae300b099/641017314cc67fbb88c517a7_good-linkedin-profile-photo-right-expression-1000x1000.jpeg",
          location: "Newyork Street, America",
          shop: 'Sailor Shop',
          email: 'peterparker@gmail.com',
          phone: '8824566984'
        },
        {
          id: 3,
          name: "Rony Mark",
          image: "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
          location: "Newyork Street, America",
          shop: 'Infinity Shop',
          email: 'ronymark@gmail.com',
          phone: '8435644980'
        },
        {
          id: 4,
          name: "Jack Reacher",
          image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1yduOF.img?w=768&h=384&m=6&x=502&y=93&s=150&d=150",
          location: "Newyork Street, America",
          shop: 'Brand Shop',
          email: 'reacher@gmail.com',
          phone: '8349127063'
        },
        {
          id: 5,
          name: "John Mark",
          image: "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
          location: "Newyork Street, America",
          shop: 'Nike Shop',
          email: 'johnmark@gmail.com',
          phone: '8435644990'
        },
        {
          id: 6,
          name: "Peter Parker",
          image: "https://cdn.prod.website-files.com/639ff8596ae419fae300b099/641017314cc67fbb88c517a7_good-linkedin-profile-photo-right-expression-1000x1000.jpeg",
          location: "Newyork Street, America",
          shop: 'Sailor Shop',
          email: 'peterparker@gmail.com',
          phone: '8445744990'
        },
        {
          id: 7,
          name: "Rony Mark",
          image: "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
          location: "Newyork Street, America",
          shop: 'Infinity Shop',
          email: 'ronymark@gmail.com',
          phone: '8435532990'
        },
        {
          id: 8,
          name: "Jack Reacher",
          image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1yduOF.img?w=768&h=384&m=6&x=502&y=93&s=150&d=150",
          location: "Newyork Street, America",
          shop: 'Brand Shop',
          email: 'reacher@gmail.com',
          phone: '8435644560'
        },
      ]  
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
          state.admins.push({
            id: action.payload.id || Date.now(),
            name: action.payload.name,
            image: action.payload.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            location: action.payload.location,
            shop: action.payload.shop,
            email: action.payload.email,
            phone: action.payload.phone,
          });
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
          image: action.payload.image || "https://via.placeholder.com/150",
          location: action.payload.location,
          coordinates: action.payload.coordinates || { lat: 0, lng: 0 },
          adminCount: action.payload.adminCount || 0,
          cameras: action.payload.cameras || [],
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
      const index = state.admins.findIndex(admin => admin.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = {
          ...state.admins[index],
          ...action.payload
        };
      }
    })
    .addCase(updateShopAdminAPI.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
    },
});

export const { addShop, updateShop, deleteShop, addAdmin, editAdmin, selectShop, clearSelectedShop } = shopsSlice.actions;

export default shopsSlice.reducer;