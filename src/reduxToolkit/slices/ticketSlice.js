import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [
    { id: '#1234', date: '2025-03-02 10:15', info: 'We noticed something odd with the shop camera.', status: 'Pending' },
    { id: '#5678', date: '2025-03-02 10:15', info: 'Heads up! The shop camera seems off.', status: 'Need Reply' },
    { id: '#9101', date: '2025-03-02 10:15', info: 'We found odd stuff in the footage.', status: 'Resolved' },
    { id: '#1122', date: '2025-03-02 10:15', info: 'We spotted strange things in the camera.', status: 'Resolved' },
    { id: '#3344', date: '2025-03-02 10:15', info: 'Funky things are happening in the recordings.', status: 'Resolved' },
    { id: '#3344', date: '2025-03-02 10:15', info: 'Funky things are happening in the recordings.', status: 'Resolved' },
    { id: '#3344', date: '2025-03-02 10:15', info: 'Funky things are happening in the recordings.', status: 'Resolved' },
    { id: '#3344', date: '2025-03-02 10:15', info: 'Funky things are happening in the recordings.', status: 'Resolved' },
    { id: '#3344', date: '2025-03-02 10:15', info: 'Funky things are happening in the recordings.', status: 'Resolved' },
  ]
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action) => {
      return {...state, tickets: [...state.tickets, action.payload]}
    },
    updateTicket: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const ticketIndex = state.tickets.findIndex(ticket => ticket.id === id);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex] = { ...state.tickets[ticketIndex], ...updatedData };
      }
    }
  }
});

export const { addTicket, updateTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;