import { FlightResult } from "@/types/flight";
import api from "./api";

export const getFlights = async (): Promise<FlightResult[]> => {
  const response = await api.get("/api/flights");
  const data = response.data;

  const sectors = data?.result?.sectors;
  const airlineMap = data?.result?.metaData?.airlineDetail || {};
  const airportMap = data?.result?.metaData?.airportDetail || {};

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

      const fromCode = firstFlight.departureAirport.code;
      const toCode = lastFlight.arrivalAirport.code;

      const fromCity =
        airportMap?.[fromCode]?.city || fromCode;

      const toCity =
        airportMap?.[toCode]?.city || toCode;

      const flightNumber = flights
        .map((f: any) => f.fltNo)
        .join(" / ");

      const segmentDuration = flights.reduce(
        (total: number, f: any) =>
          total + (f.durationInMin || 0),
        0
      );

      const layoverDuration =
        option.otherDetails?.stops?.reduce(
          (acc: number, stop: any) =>
            acc + (stop.layOverTimeInMins || 0),
          0
        ) || 0;

      const totalDuration = segmentDuration + layoverDuration;

      results.push({
        id: option.flUnqiueId,

        airlineCode,
        airlineName,
        flightNumber,

        fromCode,
        toCode,
        fromCity,
        toCity,

        departureTime: firstFlight.departureAirport.time,
        arrivalTime: lastFlight.arrivalAirport.time,

        duration: totalDuration,
        stops: option.otherDetails?.totalStops ?? 0,

        price: Number(
          option.fares?.[0]?.price?.pricePerAdult ?? 0
        ),
      });
    });
  });

  return results;
};
