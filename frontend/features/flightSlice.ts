import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlights } from "@/services/flightService";

export interface FlightLeg {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  airlineCode: string;
}

export interface FlightResult {
  id: string;
  airlineCodes: string[];
  departureTime: string;
  totalStops: number;
  price: number;
  legs: FlightLeg[];
}

interface FlightState {
  flights: FlightResult[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: [],
  isLoading: false,
  error: null,
};

export const fetchFlights = createAsyncThunk<
  FlightResult[],
  void,
  { rejectValue: string }
>("flights/fetchFlights", async (_, { rejectWithValue }) => {
  try {
    return await getFlights();
  } catch (error) {
    return rejectWithValue("Failed to fetch flights");
  }
});

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default flightSlice.reducer;
