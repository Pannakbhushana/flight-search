"use client"
import { redirect } from "next/navigation";
import { fetchFlights } from "@/features/flightSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export default function Home() {
   redirect("/flights");
    const dispatch = useAppDispatch();
  const { flights, isLoading, error } = useAppSelector(
    (state) => state.flights
  );

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  console.log("flights---", flights)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <div>Hello</div>
      </main>
    </div>
  );
}
