import { NextResponse } from "next/server";
import flights from "@/data/flight-search.json";

export async function GET() {
  return NextResponse.json(flights);
}
