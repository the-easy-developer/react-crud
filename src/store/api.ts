import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ShipmentType, FetchRecordsArgType } from "../types";
import { BASE_URL, editShipment } from "../service";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Shipment"],
  endpoints: (builder) => ({
    getShipments: builder.query<
      { records: ShipmentType[]; totalRecords: number },
      FetchRecordsArgType
    >({
      query: ({ page, limit, query }: FetchRecordsArgType) =>
        `/shipments?_page=${page}&_limit=${limit}&q=${query}`,
      transformResponse: (records: ShipmentType[], meta) => ({
        records,
        totalRecords: Number(meta?.response?.headers.get("X-Total-Count")),
      }),
      providesTags: ["Shipment"],
    }),

    createShipment: builder.mutation<ShipmentType, ShipmentType>({
      query: (shipment) => ({
        url: "/shipments",
        method: "POST",
        body: { ...shipment, cargo: [], services: [] },
      }),
      invalidatesTags: ["Shipment"],
    }),

    editShipment: builder.mutation<ShipmentType, ShipmentType>({
      query: (shipment) => ({
        url: `/shipments/${shipment.id}`,
        method: "PUT",
        body: { ...shipment, cargo: [], services: [] },
      }),
      invalidatesTags: ["Shipment"],
    }),

    deleteShipment: builder.mutation({
      query: (shipmentId: string) => ({
        url: `/shipments/${shipmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shipment"],
    }),
  }),
});

export const {
  useGetShipmentsQuery,
  useCreateShipmentMutation,
  useEditShipmentMutation,
  useDeleteShipmentMutation
} = apiSlice;
