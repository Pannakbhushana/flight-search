import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applyFlightQuery } from "@/services/flightQueryService";

import type { FlightResult } from "@/types/flight";
import { RootState } from "@/store";
import { QueryFilters, QueryState } from "@/types/query";

const initialState: QueryState = {
  filters: {
    page: 1,
    pageSize: 5,
    sortBy: "price",
  },
  results: [],
  totalResults: 0,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<QueryFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: 1,
      };
    },

    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },

    executeQuery(state, action: PayloadAction<FlightResult[]>) {
      const filtered = applyFlightQuery(
        action.payload,
        state.filters
      );

      state.totalResults = filtered.length;

      const { page, pageSize } = state.filters;

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      state.results = filtered.slice(start, end);
    },

    resetQuery(state) {
      state.filters = initialState.filters;
      state.results = [];
      state.totalResults = 0;
    },
  },
});

export const {
  setFilters,
  executeQuery,
  setPage,
  resetQuery,
} = querySlice.actions;

export default querySlice.reducer;

export const selectQueryState = (state: RootState) =>
  state.query;

export const selectQueryResults = (state: RootState) =>
  state.query.results;

export const selectTotalPages = (state: RootState) =>
  Math.ceil(
    state.query.totalResults /
      state.query.filters.pageSize
  );
