import type { TableState, ShipmentType } from "./types";

export const BASE_URL = "http://localhost:3000";

export async function fetchData(
  page: number,
  limit: number,
  query: string
): Promise<{ records: TableState["records"]; totalRecords: number }> {
  const data = await fetch(
    `${BASE_URL}/shipments?_page=${page}&_limit=${limit}&q=${query}`
  );
  return {
    records: await data.json(),
    totalRecords: parseInt(data.headers.get("x-total-count") ?? "0", 10),
  };
}

export async function createShipment(obj: ShipmentType) {
  const data = await fetch(`${BASE_URL}/shipments`, {
    method: "POST",
    body: JSON.stringify({ ...obj, cargo: [], services: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(data, await data.json());
}

export async function editShipment(obj: ShipmentType) {
  const data = await fetch(`${BASE_URL}/shipments/${obj.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...obj, cargo: [], services: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(data, await data.json());
}
