import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlights } from "@/services/flightService";
import { FlightResult, FlightState } from "@/types/flight";

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

 const initialState: FlightState = {
  flights: [],
  isLoading: false,
  error: null,
};

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
