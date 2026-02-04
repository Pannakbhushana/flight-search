import api from "./api";

export interface FlightResult {
  id: string;
  airlineCodes: string[];
  departureTime: string;
  totalStops: number;
  price: number;
  legs: {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    airlineCode: string;
  }[];
}

export const getFlights = async (): Promise<FlightResult[]> => {
  const response = await api.get("/api/flights");
  const data = response.data;

  const sectors = data?.result?.sectors;
  if (!sectors) return [];

  const results: FlightResult[] = [];

  Object.values(sectors).forEach((sector: any) => {
    Object.values(sector).forEach((option: any) => {
      results.push({
        id: option.flUnqiueId,
        airlineCodes: option.otherDetails.airline,
        departureTime: option.otherDetails.departureTime,
        totalStops: option.otherDetails.totalStops,
        price: Number(option.fares[0]?.price?.pricePerAdult ?? 0),
        legs: option.flights.map((f: any) => ({
          from: f.departureAirport.code,
          to: f.arrivalAirport.code,
          departureTime: f.departureAirport.time,
          arrivalTime: f.arrivalAirport.time,
          airlineCode: f.airlineCode,
        })),
      });
    });
  });

  return results;
};
