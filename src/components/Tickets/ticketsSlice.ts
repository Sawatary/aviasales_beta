// src/components/Tickets/ticketsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const response = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );
    const { searchId } = await response.json();
  
    const ticketsResponse = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );
    const data = await ticketsResponse.json();
    return data.tickets;
  }
);

interface Ticket {
  id: string;
  price: number;
  poster: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    duration: number;
    stops: string[];
  }[];
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки билетов";
      });
  },
});

export default ticketsSlice.reducer;
