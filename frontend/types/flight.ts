export interface Flight {
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

export interface FlightCard {
  airlineName: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: string;
}

export interface FlightResult {
  id: string;

  airlineCode: string;
  airlineName: string;
  flightNumber: string;

  fromCode: string;
  toCode: string;
  fromCity: string;
  toCity: string;

  departureTime: string;
  arrivalTime: string;

  duration: number;
  stops: number;

  price: number;
}

export interface FlightLeg {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  airlineCode: string;
}

export interface FlightState {
  flights: FlightResult[];
  isLoading: boolean;
  error: string | null;
}