import { FlightResult } from "./flight";

export type QueryFilters = {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;

  priceRange?: [number, number];
  stops?: number[];
  departureTimeRange?: [number, number];

  sortBy?: "price" | "duration" | "departure";
  page: number;
  pageSize: number;
};

export type QueryState = {
  filters: QueryFilters;
  results: FlightResult[];
  totalResults: number;
};