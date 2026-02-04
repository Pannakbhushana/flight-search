import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 to-slate-200 p-3 sm:p-4 md:p-6">
      <SearchBar />

      <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:flex-row lg:gap-6">
        <div className="lg:w-72">
          <Filters />
        </div>

        <div className="flex-1">
          <SortBar />

          <div className="mt-4 min-h-120 rounded-lg border bg-gray-100 p-6 text-center text-sm text-gray-500 sm:text-base">
            Flight results will appear here
          </div>
        </div>
      </div>
    </div>
  );
}
