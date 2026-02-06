"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Filters from "../components/Filters";
import FlightCard from "../components/FlightCard";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import { useEffect } from "react";
import { fetchFlights } from "@/features/flightSlice";
import { executeQuery, setPage } from "@/features/querySlice";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function FlightsPage() {
  const dispatch = useAppDispatch();

  const { flights, isLoading, error } = useAppSelector(
    (state) => state.flights
  );

  const { results, totalResults, filters } =
    useAppSelector((state) => state.query);

  const { page = 1, pageSize = 5 } = filters;

  const totalPages = Math.ceil(
    totalResults / pageSize
  );

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    if (flights.length) {
      dispatch(executeQuery(flights));
    }
  }, [flights, dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(executeQuery(flights));
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-slate-100 to-slate-200 p-3 sm:p-4 md:p-6"
      style={{
        backgroundImage: "url('/sky.webp')",
      }}
    >
      <SearchBar />

      <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:flex-row lg:gap-6">
        <div className="lg:w-72">
          <Filters />
        </div>

        <div className="flex-1">
          <SortBar />

          <div className="mt-4 min-h-120 rounded-lg p-6">
            {results.length !== 0 ? (
              <>
                {results.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                  />
                ))}

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      handlePageChange(page - 1)
                    }
                    className="rounded bg-gray-200 px-3 py-1 disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <span className="text-sm font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      handlePageChange(page + 1)
                    }
                    className="rounded bg-gray-200 px-3 py-1 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-2xl font-semibold text-gray-700">
                  No result found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
