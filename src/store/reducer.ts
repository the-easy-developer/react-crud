import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from ".";
import type {
  UpdatePaginationModelActionType,
  TableState,
  UpdateQueryActionType,
  UpdateFilterActionType,
} from "../types";

export const initValues = {
  page: 1,
  limit: 10,
  query: "",
};

const tableSlice = createSlice({
  name: "table",
  initialState: {
    paginationModel: {
      page: initValues.page,
      limit: initValues.limit,
    },
    query: initValues.query,
  } as TableState,
  reducers: {
    updatePaginationModel(state, action: UpdatePaginationModelActionType) {
      state.paginationModel = {
        ...state.paginationModel,
        ...action.payload,
      };
    },
    updateQuery(state, action: UpdateQueryActionType) {
      state.query = action.payload.query;
    },
    updateFilters(state, action: UpdateFilterActionType) {
      state.query = action.payload.query;
      state.paginationModel.limit = action.payload.limit;
      state.paginationModel.page = action.payload.page;
    },
  },
});

export const tableSelector = (state: RootState) => state.table;

export const { updatePaginationModel, updateQuery, updateFilters } =
  tableSlice.actions;

export default tableSlice.reducer;
