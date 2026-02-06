export function applyFlightQuery(
  flights: any[],
  filters: any
) {
  let result = [...flights];

  if (filters.from) {
    const search = filters.from.toLowerCase();
    result = result.filter(f =>
      f.fromCode.toLowerCase() === search ||
      f.fromCity.toLowerCase().includes(search)
    );
  }

  if (filters.to) {
    const search = filters.to.toLowerCase();
    result = result.filter(f =>
      f.toCode.toLowerCase() === search ||
      f.toCity.toLowerCase().includes(search)
    );
  }

  if (filters.departureDate) {
    result = result.filter(
      f =>
        f.departureTime.split("T")[0] ===
        filters.departureDate
    );
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter(
      f => f.price >= min && f.price <= max
    );
  }

  if (filters.stops?.length) {
    result = result.filter(f =>
      filters.stops.includes(f.stops)
    );
  }

  if (filters.departureTimeRange) {
    const [start, end] = filters.departureTimeRange;
    result = result.filter(f => {
      const hour = new Date(
        f.departureTime
      ).getHours();
      return hour >= start && hour <= end;
    });
  }

  if (filters.sortBy === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  if (filters.sortBy === "duration") {
    result.sort(
      (a, b) => a.duration - b.duration
    );
  }

  if (filters.sortBy === "departure") {
    result.sort(
      (a, b) =>
        new Date(a.departureTime).getTime() -
        new Date(b.departureTime).getTime()
    );
  }

  return result;
}

