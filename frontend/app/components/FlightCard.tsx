import { formatDateTime } from "@/utils/formatDateTime";
import { formatDuration } from "@/utils/formatDuration";

export default function FlightCard({ flight }: any) {
  return (
    <div className="mb-4 rounded-xl border border-white/30 bg-white/95 p-5 shadow-sm transition hover:shadow-lg">

      {/* ========== MOBILE HEADER ========== */}
      <div className="flex items-start justify-between gap-4 md:hidden">
        <div className="flex items-center gap-3">
          <img
            src="/flight-logo.png"
            alt="Airline logo"
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="text-xs font-semibold uppercase text-gray-700">
              {flight.airlineName}
            </p>
            <p className="text-xs text-gray-500">
              {flight.flightNumber}
            </p>
          </div>
        </div>

        <p className="text-lg font-bold text-green-700">
          ₹{flight.price}
        </p>
      </div>

      {/* ========== DESKTOP STRUCTURE ========== */}
      <div className="mt-5 grid gap-6 lg:grid-cols-[220px_1fr_200px] lg:items-center">

        {/* LEFT — Airline Info */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <img
            src="/flight-logo.png"
            alt="Airline logo"
            className="h-12 w-12 object-contain"
          />
          <div>
            <p className="text-sm font-semibold uppercase text-gray-800">
              {flight.airlineName}
            </p>
            <p className="text-xs text-gray-500">
              {flight.flightNumber}
            </p>
          </div>
        </div>

        {/* CENTER — Flight Timeline */}
        <div className="grid grid-cols-3 items-center text-center">
          
          {/* Departure */}
          <div>
            <p className="text-xs font-semibold uppercase text-gray-600">
              Departure
            </p>
            <p className="text-sm md:text-lg font-semibold">
              {formatDateTime(flight.departureTime)}
            </p>
            <p className="text-xs text-gray-500">
              {flight.fromCity}
            </p>
          </div>

          {/* Duration + Line */}
          <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-gray-500">
              {formatDuration(flight.duration)}
            </p>

            <div className="my-2 flex w-full items-center gap-2">
              <div className="h-[2px] flex-1 bg-gray-300" />
              <div className="h-2 w-2 rounded-full bg-gray-400" />
              <div className="h-[2px] flex-1 bg-gray-300" />
            </div>

            <p className="text-xs text-gray-500">
              {flight.stops === 0
                ? "Non-stop"
                : flight.stops === 1
                ? "1 Stop"
                : `${flight.stops} Stops`}
            </p>
          </div>

          {/* Arrival */}
          <div>
            <p className="text-xs font-semibold uppercase text-gray-600">
              Arrival
            </p>
            <p className="text-sm md:text-lg font-semibold">
              {formatDateTime(flight.arrivalTime)}
            </p>
            <p className="text-xs text-gray-500">
              {flight.toCity}
            </p>
          </div>
        </div>

        {/* RIGHT — Price + CTA */}
        <div className="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col lg:items-end lg:border-l lg:border-gray-200 lg:pl-6">
          <div className="text-right">
            <p className="text-xs uppercase text-gray-500">
              Price
            </p>
            <p className="text-2xl font-bold text-green-700">
              ₹{flight.price}
            </p>
          </div>

          <button className="mt-3 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 lg:w-auto">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
