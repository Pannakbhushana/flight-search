"use client";

import { useState } from "react";

export default function SearchBar() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");

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
          className="rounded border p-2"
        />

        <input
          type="text"
          placeholder="To"
          className="rounded border p-2"
        />

        <input
          type="date"
          className="rounded border p-2"
        />

        {tripType === "roundtrip" && (
          <input
            type="date"
            className="rounded border p-2"
          />
        )}

        <input
          type="number"
          min={1}
          defaultValue={1}
          className="rounded border p-2"
          placeholder="Passengers"
        />

        <button className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:scale-[0.98]">
          Search
        </button>
      </div>
    </div>
  );
}
