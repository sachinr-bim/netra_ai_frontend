// features/subscription/subscriptionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  axios from 'axios'

export const createSubscription = createAsyncThunk(
  'subscription/createSubscription',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post( `http://52.90.112.216/api/subscription/create`,
        subscriptionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Subscription created:', response.data)
      return response.data
    } catch (error) {
      console.log('Failed to create subscription:', error.response?.data?.message)
      return rejectWithValue(error.response?.data?.message || 'Failed to create subscription');
    }
  }
);

export const fetchPlans = createAsyncThunk(
  'subscription/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`http://52.90.112.216/api/plan/plans`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch plans');
    }
  }
);


const initialState = {
  plans: [],
  upcomingPayments: [
    {
      id: "SUB-789012",
      name: "Sailor Shop",
      dueDate: "2023-12-15",
      amount: "$99.00",
      plan: "Premium",
      status: "Upcoming",
      renewalDate: "2023-12-15"
    },
    {
      id: "SUB-345678",
      name: "Mall Branch",
      dueDate: "2023-12-20",
      amount: "$49.00",
      plan: "Basic",
      status: "Upcoming",
      renewalDate: "2023-12-20"
    },
    {
      id: "SUB-901234",
      name: "Suburban Shop",
      dueDate: "2024-01-05",
      amount: "$149.00",
      plan: "Enterprise",
      status: "Upcoming",
      renewalDate: "2024-01-05"
    },
    {
      id: "SUB-901235",
      name: "Airport Kiosk",
      dueDate: "2024-01-05",
      amount: "$149.00",
      plan: "Enterprise",
      status: "Upcoming",
      renewalDate: "2024-01-05"
    }
  ],
  loading: false,
  error: null
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // Add reducers here if needed
    fetchUpcomingPaymentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUpcomingPaymentsSuccess(state, action) {
      state.upcomingPayments = action.payload;
      state.loading = false;
    },
    fetchUpcomingPaymentsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetSubscriptionState(state) {
      state.createdSubscription = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.createdSubscription = action.payload;
        
        // Add to upcoming payments
        state.upcomingPayments.push({
          amount: `${action.payload.amount}`,
          payment_method: "Paypal",
          payment_status:"Success",
          plan_id: action.payload.plan_id,
          status: "Active",
        });
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Plans
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  fetchUpcomingPaymentsStart,
  fetchUpcomingPaymentsSuccess,
  fetchUpcomingPaymentsFailure,
  resetSubscriptionState
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;