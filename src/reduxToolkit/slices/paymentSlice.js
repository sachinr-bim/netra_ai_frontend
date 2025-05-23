// paymentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;
      const response = await axios.get(`${API_URL}/api/payment/tenant/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentDetails = createAsyncThunk(
  "payments/fetchPaymentDetails",
  async (paymentId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;
      const response = await axios.get(`${API_URL}/api/payment/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingPayment = createAsyncThunk(
  "payments/updateExistingPayment",
  async ({ id, updatedData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;
      const response = await axios.put(`${API_URL}/api/payment/tenant/${id}/`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteExistingPayment = createAsyncThunk(
  "payments/deleteExistingPayment",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;
      await axios.delete(`${API_URL}/api/payment/tenant/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  payments: [],
  status: "idle",
  error: null,
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateExistingPayment.fulfilled, (state, action) => {
        const index = state.payments.findIndex(
          payment => payment.id === action.payload.id
        );
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(deleteExistingPayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter(
          payment => payment.id !== action.payload
        );
      })
      .addCase(fetchPaymentDetails.pending, (state) => {
      state.detailsStatus = "loading";
      })
      .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.currentPayment = action.payload;
      })
      .addCase(fetchPaymentDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.payload;
      });
  }
});

export default paymentsSlice.reducer;