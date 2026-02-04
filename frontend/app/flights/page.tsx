import Filters from "../components/Filters";
import FlightCard from "../components/FlightCard";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";

const flight = {
  airlineName: "Air India",
  flightNumber: "AI 531",
  from: "DEL",
  to: "AMD",
  departureTime: "06:30",
  arrivalTime: "08:10",
  duration: "1h 40m",
  stops: "Non-stop",
  price: "4,999",
};

export default function FlightsPage() {
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
            <FlightCard flight={flight} />
          </div>
        </div>
      </div>
    </div>
  );
}
