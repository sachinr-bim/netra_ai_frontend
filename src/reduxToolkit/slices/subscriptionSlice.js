// features/subscription/subscriptionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    }
  }
});

export const { 
  fetchUpcomingPaymentsStart,
  fetchUpcomingPaymentsSuccess,
  fetchUpcomingPaymentsFailure
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;