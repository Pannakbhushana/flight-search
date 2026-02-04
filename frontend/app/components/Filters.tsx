"use client";

export default function Filters() {
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
          className="w-full cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>₹0</span>
          <span>₹50,000</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Stops
        </label>

        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Non-stop
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            1 stop
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            2+ stops
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Departure Time
        </label>
        <input
          type="range"
          min={0}
          max={24}
          className="w-full cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>00:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}
