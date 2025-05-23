import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

// Async thunk for creating a ticket
export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/ticket/create`, ticketData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      console.log('Ticket created:', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching tickets
export const fetchTicketsByShop = createAsyncThunk(
  'tickets/fetchTicketsByShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/ticket/shop/${shopId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/ticket/delete/${ticketId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        }
      );
      return { ticketId, data: response.data }; // Return both ticketId and response data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  'tickets/updateTicketStatus',
  async ({ ticketId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/ticket/update/${ticketId}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  'tickets/fetchTicketById',
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/ticket/${ticketId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        }
      );
      console.log('Fetched ticket:', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  tickets: [],
  currentTicket: null,  // Add this
  loading: false,
  error: null
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: (builder) => {
    builder
      // Create Ticket cases
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Tickets cases
      .addCase(fetchTicketsByShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsByShop.fulfilled, (state, action) => {
        state.loading = false;
        // Transform API data to match your component's expected format
        state.tickets = action.payload.map(ticket => ({
          id: `${ticket.ticket_id}`,
          date: new Date(ticket.createdAt).toLocaleString(),
          info: ticket.issue_name,
          status: ticket.status,
          resolvedDate: ticket.status === 'Resolved' 
            ? new Date(ticket.updatedAt).toLocaleString() 
            : 'N/A'
        }));
      })
      .addCase(fetchTicketsByShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTicket = action.payload;
        const index = state.tickets.findIndex(t => t.id === `#${updatedTicket.ticket_id}`);
        if (index !== -1) {
          state.tickets[index] = {
            ...state.tickets[index],
            info: updatedTicket.issue_name,
            status: updatedTicket.status,
            resolvedDate: updatedTicket.status === 'Resolved' 
              ? new Date(updatedTicket.updatedAt).toLocaleString() 
              : 'N/A'
          };
        }
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTicket = null; // Reset current ticket when fetching new one
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the ticket from the tickets array
        state.tickets = state.tickets.filter(t => t.id !== `#${action.payload.ticketId}`);
        // Clear current ticket if it's the one being deleted
        if (state.currentTicket?.ticket_id === action.payload.ticketId) {
          state.currentTicket = null;
        }
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  }
});

export const { addTicket, updateTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;