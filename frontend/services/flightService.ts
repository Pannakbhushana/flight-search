import { FlightResult } from "@/types/flight";
import api from "./api";

export const getFlights = async (): Promise<FlightResult[]> => {
  const response = await api.get("/api/flights");
  const data = response.data;

  const sectors = data?.result?.sectors;
  const airlineMap = data?.result?.metaData?.airlineDetail || {};

  if (!sectors) return [];

  const results: FlightResult[] = [];

  Object.values(sectors).forEach((sector: any) => {
    Object.values(sector).forEach((option: any) => {
      const flights = option.flights || [];

      if (!flights.length) return;

      const firstFlight = flights[0];
      const lastFlight = flights[flights.length - 1];

      const airlineCode = firstFlight.airlineCode;
      const airlineName =
        airlineMap?.[airlineCode]?.name || airlineCode;

      const flightNumber = flights
        .map((f: any) => f.fltNo)
        .join(" / ");

      const duration = flights.reduce(
        (total: number, f: any) => total + (f.durationInMin || 0),
        0
      );

      results.push({
        id: option.flUnqiueId,
        airlineName,
        flightNumber,
        departureTime: firstFlight.departureAirport.time,
        arrivalTime: lastFlight.arrivalAirport.time,
        duration,
        stops: option.otherDetails?.totalStops ?? 0,
        price: Number(option.fares?.[0]?.price?.pricePerAdult ?? 0),
      });
    });
  });

  return results;
};
