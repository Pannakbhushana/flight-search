"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, executeQuery } from "@/features/querySlice";

export default function SortBar() {
  const dispatch = useAppDispatch();

  const allFlights = useAppSelector(
    (state) => state.flights.flights
  );

  const { sortBy } = useAppSelector(
    (state) => state.query.filters
  );

  const resultsCount = useAppSelector(
    (state) => state.query.results.length
  );

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value =
      e.target.value as
        | "price"
        | "duration"
        | "departure";

    dispatch(
      setFilters({
        sortBy: value,
        page: 1,
      })
    );

    dispatch(executeQuery(allFlights));
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg shadow-2xl bg-gray-100/99 p-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-gray-600">
        Showing {resultsCount} flights
      </span>

      <select
        value={sortBy || "price"}
        onChange={handleSortChange}
        className="w-full rounded border p-2 text-sm sm:w-auto"
      >
        <option value="price">Sort by Price</option>
        <option value="duration">Sort by Duration</option>
        <option value="departure">Sort by Departure</option>
      </select>
    </div>
  );
}
