# Flight Search UI

![Desktop Screenshot](https://github.com/user-attachments/assets/373a0797-8bc7-4f1e-81d4-66ee9bfc8835)

---

![Screenshot-2](https://github.com/user-attachments/assets/11569ec7-b572-4ac7-a8be-d30ef9159a49)



A Flight Search and Listing module built using **Next.js (App Router)** and **TypeScript**.

This project consumes a normalized airline-style JSON API, transforms it into a UI-friendly structure, and implements full search, filtering, sorting, and pagination logic with clean architectural separation.

---

## Features

### 🔍 Search
- Source city
- Destination city
- Departure date
- One-way / Round-trip (UI supported)
- Number of passengers

### Filters
- Price range slider
- Stops (Non-stop / 1 stop / 2+ stops)
- Departure time range

### Sorting
- Sort by Price
- Sort by Duration
- Sort by Departure time

### Additional Functionalities
- Pagination
- Loading state
- Empty state
- Error handling

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS**
- Mock API via `/api/flights`

---

## Project Structure

```
frontend/
  app/
    api/
    components/
    flights/
    layout.tsx
    page.tsx
    providers.tsx
  data/
    flight-search.json
  features/
    flightSlice.ts
    querySlice.ts
  services/
    api.ts
    flightService.ts
    flightQueryService.ts
  store/
    hooks.ts
    index.ts
  types/
    flight.ts
    query.ts
  utils/
    formatDateTime.ts
    formatDuration.ts
```

---

# Architecture Overview

The application follows a layered architecture to maintain separation of concerns and keep business logic outside the UI.

---

## Data Layer

- `flight-search.json` contains the raw normalized API response.
- `/api/flights` route serves this JSON using a Next.js API handler.

---

## Service Layer

### `flightService.ts`

Responsible for:
- Fetching data using Axios
- Flattening nested airline-style data
- Mapping sectors into a clean `FlightResult[]`

This ensures UI components do not depend on backend structure.

---

### `flightQueryService.ts`

Responsible for:
- Applying search filters
- Applying price filter
- Applying stops filter
- Applying departure time filter
- Applying sorting

All filtering and sorting logic is centralized here.

---

## 3️⃣ State Management (Redux Toolkit)

Two slices are used to separate raw and derived state.

### `flightSlice`

Handles:
- API data fetching
- Loading state
- Error state
- Storing flattened flights

---

### `querySlice`

Handles:
- Filters state
- Executing search
- Sorting
- Pagination
- Storing derived results

Pagination is applied **after filtering and sorting** to ensure correct ordering.

---

# Flight Search API – JSON Explanation

The provided API follows a normalized airline-industry structure rather than a simple flat array.

---

## Top-Level Structure

```json
{
  "searchId": "...",
  "provider": "CRT",
  "success": true,
  "result": { ... }
}
```

| Field     | Meaning |
|-----------|----------|
| searchId  | Unique search identifier |
| provider  | Data supplier |
| success   | Status flag |
| result    | Contains journeys, sectors, fares, metadata |

---

## Journeys

```json
"journeys": {
  "J1": {
    "sector": "DELBLR20260131"
  }
}
```

A journey represents a full trip (Origin → Destination → Date).

The `sector` value is used to look up actual flight options inside `sectors`.

---

## Sectors (Core Structure)

```json
"sectors": {
  "DELBLR20260131": {
    "DEL-AMD-AI-531_ AMD-BLR-AI-9777": { ... }
  }
}
```

Each sector represents:

```
Origin + Destination + Date
```

Inside each sector:
- Multiple flight options exist
- Each option represents one full journey
- Each option becomes one flight card in the UI

---

## Flight Option Structure

Each flight option contains:

- `flUnqiueId`
- `flights` (segments)
- `otherDetails`
- `fares`

---

## Flights (Segments)

Represents individual legs of a journey.

- 1 segment → Non-stop
- 2 segments → 1 stop
- 3 segments → 2 stops

Used for:
- Stops calculation
- Duration calculation
- Departure and arrival mapping

---

## otherDetails

Contains pre-calculated metadata for UI:

- `totalStops`
- `departureTime`
- `lowestPrice`
- `airline`

Used for:
- Stops filter
- Sorting
- Departure time filter

---

## fares

Contains pricing details:

```json
"price": {
  "pricePerAdult": "13366.54"
}
```

Used for:
- Price display
- Price filtering
- Price sorting

---

# Data Transformation Strategy

The API response is deeply nested and normalized.

To simplify UI rendering:

1. Fetch data from `/api/flights`
2. Iterate through `sectors`
3. Extract relevant fields
4. Flatten into a clean `FlightResult[]`

Each result contains:

- id
- airlineCode
- airlineName
- flightNumber
- fromCode / toCode
- fromCity / toCity
- departureTime
- arrivalTime
- total duration
- stops
- price

This keeps UI components declarative and simple.

---

# Filtering & Sorting Logic

All query logic is centralized in `flightQueryService.ts`.

Execution order:

1. Apply search filters (from, to, departure date)
2. Apply price range
3. Apply stops filter
4. Apply departure time filter
5. Apply sorting
6. Apply pagination

Pagination is applied after filtering and sorting.

---

# How to Run

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000/flights
```

---

# Assumptions

- Search is performed at journey level (not segment level)
- Round-trip sectors are treated as separate origin-destination-date combinations
- Server-side filtering is not implemented (mock data only)

---

