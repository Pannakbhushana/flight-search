"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, executeQuery } from "@/features/querySlice";

export default function Filters() {
  const dispatch = useAppDispatch();
  const allFlights = useAppSelector(
    (state) => state.flights.flights
  );

  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedStops, setSelectedStops] =
    useState<number[]>([]);
  const [departureHour, setDepartureHour] =
    useState<number>(24);

  const applyFilters = (
    updatedStops?: number[],
    updatedPrice?: number,
    updatedHour?: number
  ) => {
    dispatch(
      setFilters({
        priceRange: [0, updatedPrice ?? maxPrice],
        stops:
          updatedStops ??
          (selectedStops.length
            ? selectedStops
            : undefined),
        departureTimeRange: [0, updatedHour ?? departureHour],
        page: 1,
      })
    );

    dispatch(executeQuery(allFlights));
  };

  const handleStopChange = (stop: number) => {
    let updated: number[];

    if (selectedStops.includes(stop)) {
      updated = selectedStops.filter((s) => s !== stop);
    } else {
      updated = [...selectedStops, stop];
    }

    setSelectedStops(updated);
    applyFilters(updated);
  };

  return (
    <div className="w-full rounded-lg shadow-2xl bg-gray-100/99 p-4 lg:sticky lg:top-4">
      <h3 className="mb-4 text-base font-semibold md:text-lg">
        Filters
      </h3>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Price Range
        </label>

        <input
          type="range"
          min={0}
          max={50000}
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMaxPrice(value);
            applyFilters(undefined, value);
          }}
          className="w-full cursor-pointer"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>₹0</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Stops
        </label>

        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStops.includes(0)}
              onChange={() => handleStopChange(0)}
            />
            Non-stop
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStops.includes(1)}
              onChange={() => handleStopChange(1)}
            />
            1 stop
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStops.includes(2)}
              onChange={() => handleStopChange(2)}
            />
            2+ stops
          </label>
        </div>
      </div>

      {/* DEPARTURE TIME */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Departure Time
        </label>

        <input
          type="range"
          min={0}
          max={24}
          value={departureHour}
          onChange={(e) => {
            const hour = Number(e.target.value);
            setDepartureHour(hour);
            applyFilters(undefined, undefined, hour);
          }}
          className="w-full cursor-pointer"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>00:00</span>
          <span>{departureHour}:00</span>
        </div>
      </div>
    </div>
  );
}
