// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = import.meta.env.VITE_API_URL

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/createTenant`, userData);
      
      // Optional: Auto-login after signup if your API returns token
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, credentials);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userInfo',response.data.user)
      }
      console.log('User Info Login',response.data.user)

      console.log('Login API data:', response.data)
      
      return response.data;
    } catch (error) {
      // Return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${API_URL}/api/user/me`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/forgot-password`, { email });
      console.log('Forgot Password:',response.data)
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyPasswordToken = createAsyncThunk(
  'auth/verifyPasswordToken',
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/verify-Password-Token`, { email, token });
      console.log('Verify Code:',response.data)
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, token, password }, { rejectWithValue }) => {
    try {
      // Add debug logging
      console.log("Sending reset request with:", { 
        email, 
        token: parseInt(token), 
        password 
      });
      
      const response = await axios.post(`${API_URL}/api/user/new-password`, {
        email,
        token: parseInt(token), // Ensure token is number
        password
      });
      
      console.log("Reset password response:", response.data);
      return response.data;
    } catch (error) {
      // Enhanced error handling
      console.error("Reset password error:", error.response?.data || error.message);
      
      let errorMessage = "Password reset failed";
      if (error.response) {
        if (error.response.data.message.includes("token")) {
          errorMessage = "Something went wrong while resetting password. Please try again later.";
        } else if (error.response.status === 400) {
          errorMessage = "Invalid request. Please check your inputs.";
        }
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Add this to your existing authSlice.js
export const deleteTenant = createAsyncThunk(
  'auth/deleteTenant',
  async (email, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(
        `${API_URL}/api/user/deleteTenant`,
        { email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Add this to your existing authSlice.js
export const updateTenant = createAsyncThunk(
  'auth/updateTenant',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `${API_URL}/api/user/updateTenant`,
        userData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Check localStorage for existing token
const userToken = localStorage.getItem('userToken') 
  ? localStorage.getItem('userToken') 
  : null;

const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;   

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear() 
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;

      localStorage.setItem('userInfo', JSON.stringify(payload.user));
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Signup cases
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // Optional: Auto-login if you want
      if (payload.token) {
        state.userToken = payload.token;
        state.userInfo = payload.user;
      }
    });
    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(forgotPassword.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    })
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    builder.addCase(verifyPasswordToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(verifyPasswordToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // Store email for reset password flow if needed
      state.resetPasswordEmail = payload.email;
    })
    builder.addCase(verifyPasswordToken.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    })
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    //Current user info API
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    // Delete Account
    builder.addCase(deleteTenant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTenant.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      // Clear user data after successful deletion
      state.userInfo = null;
      state.userToken = null;
      localStorage.clear();
    });
    builder.addCase(deleteTenant.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    // Update Tenant
    builder.addCase(updateTenant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTenant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user; // Update user info in state
      localStorage.setItem('userInfo', JSON.stringify(payload.user)); // Update localStorage
    });
    builder.addCase(updateTenant.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;

export default authSlice.reducer;