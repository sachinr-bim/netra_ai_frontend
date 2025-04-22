import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payments: [
        { id: 'INV-23487645', date: 'Mar 1, 2025', amount: '99$', plan: 'Basic', method: 'Paypal', status: 'Pending' },
        { id: 'INV-23487645', date: 'Mar 16, 2025', amount: '108$', plan: 'Premium', method: 'Paypal', status: 'Pending' },
        { id: 'INV-23487645', date: 'Mar 27, 2025', amount: '200$', plan: 'Premium', method: 'Paypal', status: 'Pending' },
        { id: 'INV-23487645', date: 'Mar 1, 2025', amount: '99$', plan: 'Basic', method: 'Paypal', status: 'Pending' },
        { id: 'INV-23487645', date: 'Mar 16, 2025', amount: '108$', plan: 'Premium', method: 'Paypal', status: 'Paid' },
        { id: 'INV-23487645', date: 'Mar 27, 2025', amount: '200$', plan: 'Premium', method: 'Paypal', status: 'Paid' },
        { id: 'INV-23487645', date: 'Mar 1, 2025', amount: '99$', plan: 'Basic', method: 'Paypal', status: 'Declined' },
        { id: 'INV-23487645', date: 'Mar 16, 2025', amount: '108$', plan: 'Premium', method: 'Paypal', status: 'Paid' },
        { id: 'INV-23487645', date: 'Mar 27, 2025', amount: '200$', plan: 'Premium', method: 'Paypal', status: 'Paid' },
      ]
};

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.payments.push(action.payload);
        },
        updatePayment: (state, action) => {
            const { index, updatedPayment } = action.payload;
            state.payments[index] = updatedPayment;
        },
        deletePayment: (state, action) => {
            state.payments.splice(action.payload, 1);
        }
    }
});

export const { addPayment, updatePayment, deletePayment } = paymentsSlice.actions;

export default paymentsSlice.reducer;