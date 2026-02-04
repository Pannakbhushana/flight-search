"use client";

export default function SortBar() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="text-sm text-gray-600">
        Showing flights
      </span>

      <select className="w-full rounded border p-2 text-sm sm:w-auto">
        <option value="price">Sort by Price</option>
        <option value="duration">Sort by Duration</option>
        <option value="departure">Sort by Departure</option>
      </select>
    </div>
  );
}
