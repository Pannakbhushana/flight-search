"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, executeQuery } from "@/features/querySlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const allFlights = useAppSelector(
    (state) => state.flights.flights
  );

  const [tripType, setTripType] =
    useState<"oneway" | "roundtrip">("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] =
    useState("");
  const [returnDate, setReturnDate] =
    useState("");
  const [passengers, setPassengers] =
    useState<number>(1);

  const handleSearch = () => {
    dispatch(
      setFilters({
        from: from || undefined,
        to: to || undefined,
        departureDate: departureDate || undefined,
        returnDate:
          tripType === "roundtrip"
            ? returnDate || undefined
            : undefined,
        passengers,
        page: 1,
      })
    );

    dispatch(executeQuery(allFlights));
  };

  return (
    <div className="rounded-lg shadow-2xl bg-gray-100/99 p-4 md:p-6">
      <div className="mb-4 flex gap-6 text-sm md:text-base">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />
          One-way
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
          />
          Round-trip
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) =>
            setFrom(e.target.value)
          }
          className="rounded border p-2"
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) =>
            setTo(e.target.value)
          }
          className="rounded border p-2"
        />

        <input
          type="date"
          value={departureDate}
          onChange={(e) =>
            setDepartureDate(e.target.value)
          }
          className="rounded border p-2"
        />

        {tripType === "roundtrip" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) =>
              setReturnDate(e.target.value)
            }
            className="rounded border p-2"
          />
        )}

        <input
          type="number"
          min={1}
          value={passengers}
          onChange={(e) =>
            setPassengers(Number(e.target.value))
          }
          className="rounded border p-2"
          placeholder="Passengers"
        />

        <button
          onClick={handleSearch}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
