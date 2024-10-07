import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// Интерфейсы для билетов и данных
export interface Segment {
  origin: string; // Код города (iata)
  destination: string; // Код города (iata)
  date: string; // Дата и время вылета обратно
  stops: string[]; // Массив кодов (iata) городов с пересадками
  duration: number; // Общее время перелёта в минутах
}

export interface Ticket {
  price: number; // Цена в рублях
  carrier: string; // Код авиакомпании (iata)
  segments: Segment[]; // Массив перелётов
}

export interface TicketsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  loading: boolean;
  error: string | null;
  stop: boolean;
  sort: "cheapest" | "fastest" | "optimal";
  filters: {
    stops: number[];
  };
}

const initialState: TicketsState = {
  tickets: [],
  filteredTickets: [],
  loading: false,
  error: null,
  stop: false,
  filters: {
    stops: [],
  },
  sort: "cheapest",
};

export interface TicketsResponse {
  tickets: Ticket[];
  stop: boolean;
}

// Асинхронные функции для получения searchId и Tickets
export const fetchSearchId = async (): Promise<string> => {
  const response = await fetch(
    `https://aviasales-test-api.kata.academy/search`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch searchId");
  }
  const { searchId } = await response.json();
  return searchId;
};

export const fetchTickets = createAsyncThunk<TicketsResponse, string>(
  "tickets/fetchTickets",
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data: TicketsResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Error fetching tickets");
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSort: (
      state,
      action: PayloadAction<"cheapest" | "fastest" | "optimal">
    ) => {
      state.sort = action.payload;
      state.filteredTickets = sortTickets(state.tickets, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTickets.fulfilled,
        (state, action: PayloadAction<TicketsResponse>) => {
          state.tickets = state.tickets.concat(action.payload.tickets);
          state.loading = false;
          state.stop = action.payload.stop;
          state.filteredTickets = sortTickets(state.tickets, "cheapest");
        }
      )
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const sortTickets = (
  tickets: Ticket[],
  sortType: "cheapest" | "fastest" | "optimal"
) => {
  switch (sortType) {
    case "cheapest":
      return [...tickets].sort((a, b) => a.price - b.price);
    case "fastest":
      return [...tickets].sort(
        (a, b) => a.segments[0].duration - b.segments[0].duration
      );
    case "optimal":
      return [...tickets].sort((a, b) => {
        const priceDiff = a.price - b.price;
        const durationDiff = a.segments[0].duration - b.segments[0].duration;
        return priceDiff + durationDiff;
      });
    default:
      return tickets;
  }
};
export const { setSort } = ticketsSlice.actions;
export default ticketsSlice.reducer;
