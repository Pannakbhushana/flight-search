export default function FlightCard({ flight }: any) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/30 bg-gray-100/95 backdrop-blur-md p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 sm:w-56">
        <img
          src="/flight-logo.png"
          alt="Airline logo"
          className="h-10 w-10 object-contain"
        />
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm md:font-semibold uppercase text-black">Airline</p>
          <p className="text-sm text-black">
            {flight.airlineName}
          </p>
          <p className="text-xs md:text-sm md:font-semibold text-black">
            Flight No.- {flight.flightNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-6 text-sm text-gray-700 sm:px-6">
        <div className="text-center flex flex-col gap-2">
          <p className="text-xs md:text-sm font-semibold uppercase text-black">Departure</p>
          <p className="font-semibold">{flight.departureTime}</p>
          <p className="text-xs text-black">{flight.from}</p>
        </div>

        <div className="text-center flex flex-col gap-2">
          <p className="text-xs md:text-sm font-semibold uppercase text-black">Duration</p>
          <p className="text-sm">{flight.duration}</p>
          <p className="text-xs text-black">{flight.stops}</p>
        </div>

        <div className="text-center flex flex-col gap-2">
          <p className="text-xs uppercase text-black md:text-sm font-semibold">Arrival</p>
          <p className="font-semibold">{flight.arrivalTime}</p>
          <p className="text-xs text-black">{flight.to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-xs  md:text-sm font-semibold uppercase text-black">Price</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{flight.price}
          </p>
        </div>

        <button className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          Select
        </button>
      </div>
    </div>
  );
}
