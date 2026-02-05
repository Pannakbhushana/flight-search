"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Filters from "../components/Filters";
import FlightCard from "../components/FlightCard";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import { useEffect } from "react";
import { fetchFlights } from "@/features/flightSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function FlightsPage() {
  const dispatch = useAppDispatch();
  const { flights, isLoading, error } = useAppSelector(
    (state) => state.flights
  );

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 to-slate-200 p-3 sm:p-4 md:p-6"
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

          <div className="mt-4 min-h-120 rounded-lg p-6 text-center text-sm text-white sm:text-base">
            {flights.length!== 0 ? flights.map((flight, i)=> <FlightCard key={i} flight={flight} />):
            <><div className="flex justify-center items-center">
              <p className="text-2xl font-semibold">No result found</p>
              </div></>}
          </div>
        </div>
      </div>
    </div>
  );
}
