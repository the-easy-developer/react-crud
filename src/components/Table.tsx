import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import {
  tableSelector,
  updatePaginationModel,
  updateFilters,
} from "../store/reducer";
import type { AppDispatch } from "../store";
import Pagination from "./Pagination";
import AddEdit from "./AddEdit";
import type { ShipmentType } from "../types";
import { useGetShipmentsQuery, useDeleteShipmentMutation } from "../store/api";

function Table() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    paginationModel: { limit, page },
    query,
  } = useSelector(tableSelector);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editObj, setEditObj] = useState<ShipmentType>();

  const {
    data: { records = [], totalRecords = 0 } = {},
    isFetching,
    isLoading,
  } = useGetShipmentsQuery({
    page,
    limit,
    query,
  });

  const [deleteShipment, { isLoading: isDeleting }] =
    useDeleteShipmentMutation();

  const debouncedUpdateQuery = useDebouncedCallback((value) => {
    const newFilters = { query: value, limit, page: 1 };
    dispatch(updateFilters(newFilters));
  }, 1000);

  console.log("sbk", { isFetching, isLoading, isDeleting });

  return (
    <div className="max-w-[800px] pr-4 pl-4">
      <div className="w-full flex justify-between mb-1">
        <button
          type="button"
          className="border h-10 w-10"
          onClick={() => setShowAddEditModal(true)}
        >
          +
        </button>
        <AddEdit
          show={showAddEditModal}
          close={() => setShowAddEditModal(false)}
          shipmentObj={editObj}
        />
        <input
          type="text"
          placeholder="Search"
          className="border p-1"
          onChange={(e) => {
            debouncedUpdateQuery(e.currentTarget.value);
          }}
        />
      </div>
      <div className="relative">
        <div className="max-h-[600px] overflow-auto">
          <table className="border w-full">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Mode</th>
                <th className="border p-2">Origin</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((t) => (
                <tr key={t.id}>
                  <td className="border p-2">{t.id}</td>
                  <td className="border p-2">{t.mode}</td>
                  <td className="border p-2">{t.origin}</td>
                  <td className="border p-2">{t.name}</td>
                  <td className="border p-2">{t.destination}</td>
                  <td className="border p-2">{t.status}</td>
                  <td className="border p-2">{t.total}</td>
                  <td className="border p-2">{t.type}</td>
                  <td className="border p-2">
                    <button
                      type="button"
                      className="border p-1"
                      onClick={() => {
                        setEditObj(t);
                        setShowAddEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="border p-1"
                      onClick={async () => {
                        try {
                          await deleteShipment(t.id).unwrap();
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isDeleting && (
          <div className="absolute bg-white opacity-50 h-full w-full top-0" />
        )}
      </div>
      <div className="w-full flex justify-end mt-1 gap-1">
        <div>
          <Pagination
            totalRecords={totalRecords}
            currentPage={page}
            limit={limit}
            onChange={(newPage) => {
              dispatch(updatePaginationModel({ page: newPage }));
            }}
          />
        </div>
        <select
          className="border"
          title="Rows per page"
          value={limit}
          onChange={(e) => {
            dispatch(
              updatePaginationModel({
                page: 1,
                limit: parseInt(e.target.value, 10),
              })
            );
          }}
        >
          <option> 10 </option>
          <option> 15 </option>
          <option> 25 </option>
        </select>
      </div>
    </div>
  );
}

export default Table;
